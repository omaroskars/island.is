import { logger } from '@island.is/logging'
import { Injectable } from '@nestjs/common'
import flatten from 'lodash/flatten'
import { hashElement } from 'folder-hash'
import {
  ContentSearchImporter,
  MappedData,
  SearchIndexes,
  SyncOptions,
  SyncResponse,
} from '@island.is/content-search-indexer/types'
import { ArticleSyncService } from './importers/article.service'
import { ContentfulService } from './contentful.service'
import { LifeEventsPageSyncService } from './importers/lifeEventsPage.service'
import { ArticleCategorySyncService } from './importers/articleCategory.service'
import { NewsSyncService } from './importers/news.service'
import { AboutPageSyncService } from './importers/aboutPage.service'
import { Entry } from 'contentful'
import { ElasticService } from '@island.is/content-search-toolkit'

export interface PostSyncOptions {
  folderHash: string
  elasticIndex: string
  token: string
}

interface UpdateLastHashOptions {
  elasticIndex: PostSyncOptions['elasticIndex']
  folderHash: PostSyncOptions['folderHash']
}

export type processSyncDataInput<T> = (Entry<any> | T)[]
export type doMappingInput<T> = T[]
export interface CmsSyncProvider<T> {
  processSyncData: (entries: processSyncDataInput<T>) => T[]
  doMapping: (entries: doMappingInput<T>) => MappedData[]
}

@Injectable()
export class CmsSyncService implements ContentSearchImporter<PostSyncOptions> {
  private contentSyncProviders: CmsSyncProvider<any>[]
  constructor(
    private readonly aboutPageSyncService: AboutPageSyncService,
    private readonly newsSyncService: NewsSyncService,
    private readonly articleCategorySyncService: ArticleCategorySyncService,
    private readonly articleSyncService: ArticleSyncService,
    private readonly lifeEventsPageSyncService: LifeEventsPageSyncService,
    private readonly contentfulService: ContentfulService,
    private readonly elasticService: ElasticService,
  ) {
    this.contentSyncProviders = [
      this.articleSyncService,
      this.lifeEventsPageSyncService,
      this.articleCategorySyncService,
      this.newsSyncService,
      this.aboutPageSyncService,
    ]
  }

  private async getLastFolderHash(elasticIndex: string): Promise<string> {
    logger.info('Getting folder hash from index', {
      index: elasticIndex,
    })
    // return last folder hash found in elasticsearch else return empty string
    return this.elasticService
      .findById(elasticIndex, 'cmsImportFolderHashId')
      .then((document) => document.body._source.title)
      .catch((error) => {
        // we expect this to throw when this does not exist, this might happen if we reindex a fresh elasticsearch index
        logger.warn('Failed to get last folder hash', {
          error: error.message,
        })
        return ''
      })
  }

  /**
   * We only want to keep one folder hash to have the ability to roll back when restoring old builds
   */
  private async updateLastFolderHash({
    elasticIndex,
    folderHash,
  }: UpdateLastHashOptions) {
    // we get this next sync token from Contentful on sync request
    const folderHashDocument = {
      _id: 'cmsImportFolderHashId',
      title: folderHash,
      type: 'cmsImportFolderHash',
      dateCreated: new Date().getTime().toString(),
      dateUpdated: new Date().getTime().toString(),
    }

    // write sync token to elastic here as it's own type
    logger.info('Writing models hash to elasticsearch index')
    return this.elasticService.index(elasticIndex, folderHashDocument)
  }

  // this will generate diffrent hash when any file has been changed in the importer app
  private async getModelsFolderHash(): Promise<string> {
    // node_modules is quite big, it's unlikely that changes here will effect the cms importers mappings
    const options = { folders: { exclude: ['node_modules'] } }
    const hashResult = await hashElement(__dirname, options)
    return hashResult.hash.toString()
  }

  // this is triggered from ES indexer service
  async doSync(
    options: SyncOptions,
  ): Promise<SyncResponse<PostSyncOptions> | null> {
    logger.info('Doing cms sync', options)
    let cmsSyncOptions: SyncOptions

    /**
     * We don't want full sync to run every time we start a new pod
     * We want full sync to run once when the first pod initializes the first container
     * and the never again until a new build is deployed
     */
    let folderHash
    if (options.syncType === 'initialize') {
      const { elasticIndex = SearchIndexes[options.locale] } = options

      folderHash = await this.getModelsFolderHash()
      const lastFolderHash = await this.getLastFolderHash(elasticIndex)
      if (folderHash !== lastFolderHash) {
        logger.info(
          'Folder and index folder hash dont match, running full sync',
          { locale: options.locale },
        )
        cmsSyncOptions = { ...options, syncType: 'full' }
      } else {
        logger.info('Folder and index folder hash match, skipping sync', {
          locale: options.locale,
        })
        // we skip import if it is not needed
        return null
      }
    } else {
      cmsSyncOptions = options
      folderHash = ''
    }

    // gets all data that needs importing
    const {
      items,
      deletedItems,
      token,
      elasticIndex,
    } = await this.contentfulService.getSyncEntries(cmsSyncOptions)
    logger.info('Got sync data')

    // import data from all providers
    const importableData = this.contentSyncProviders.map(
      (contentSyncProvider) => {
        const data = contentSyncProvider.processSyncData(items)
        return contentSyncProvider.doMapping(data)
      },
    )

    return {
      add: flatten(importableData),
      remove: deletedItems,
      postSyncOptions: {
        folderHash,
        elasticIndex,
        token,
      },
    }
  }

  // write next sync token to elastic after sync to ensure it runs again on failure
  async postSync({ folderHash, elasticIndex, token }: PostSyncOptions) {
    await this.contentfulService.updateNextSyncToken({ elasticIndex, token })
    // we only want to update folder hash if it is set to a non empty string
    if (folderHash) {
      await this.updateLastFolderHash({ elasticIndex, folderHash })
    }
    return true
  }
}
