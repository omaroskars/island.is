import { Client } from '@elastic/elasticsearch'
import merge from 'lodash/merge'
import * as AWS from 'aws-sdk'
import * as AwsConnector from 'aws-elasticsearch-connector'
import { Injectable } from '@nestjs/common'
import { logger } from '@island.is/logging'
import { autocompleteTermQuery } from '../queries/autocomplete'
import { searchQuery } from '../queries/search'
import { documentByMetaDataQuery } from '../queries/documentByMetaData'
import {
  AutocompleteTermInput,
  SearchInput,
  TagAggregationResponse,
  DocumentByMetaDataInput,
  DateAggregationInput,
  DateAggregationResponse,
  AutocompleteTermResponse,
  TagAggregationInput,
  SyncRequest,
} from '../types'
import { GetByIdResponse, SearchResponse } from '@island.is/shared/types'
import {
  MappedData,
  SearchIndexes,
} from '@island.is/content-search-indexer/types'
import { environment } from '../environments/environment'
import { dateAggregationQuery } from '../queries/dateAggregation'
import { tagAggregationQuery } from '../queries/tagAggregation'

const { elastic } = environment

@Injectable()
export class ElasticService {
  private client: Client
  constructor() {
    logger.debug('Created ES Service')
  }

  async index(index: string, { _id, ...body }: MappedData) {
    try {
      const client = await this.getClient()
      return await client.index({
        id: _id,
        index: index,
        body,
      })
    } catch (error) {
      logger.error('Elastic request failed on index', error)
      throw error
    }
  }

  // this can partially succeed
  async bulk(index: string, documents: SyncRequest) {
    logger.info('Processing documents', {
      index,
      added: documents.add.length,
      removed: documents.remove.length,
    })

    const requests = []
    // if we have any documents to add add them to the request
    if (documents.add.length) {
      documents.add.forEach(({ _id, ...document }) => {
        requests.push({
          index: { _index: index, _id },
        })
        requests.push(document)
        return requests
      })
    }

    // if we have any documents to remove add them to the request
    if (documents.remove.length) {
      documents.remove.forEach((_id) => {
        requests.push({
          delete: { _index: index, _id },
        })
      })
    }

    if (!requests.length) {
      logger.info('No requests for elasticsearch to execute')
      // no need to continue
      return false
    }

    try {
      // elasticsearch does not like big requests (above 5mb) so we limit the size to 200 entries just in case
      const chunkSize = 200 // this has to be an even number
      const client = await this.getClient()
      let requestChunk = requests.splice(-chunkSize, chunkSize)
      while (requestChunk.length) {
        // wait for request b4 continuing
        const response = await client.bulk({
          index: index,
          body: requestChunk,
        })

        // not all errors are thrown log if the response has any errors
        if (response.body.errors) {
          logger.error('Failed to import some documents in bulk import', {
            response,
          })
        }
        requestChunk = requests.splice(-chunkSize, chunkSize)
      }

      return true
    } catch (error) {
      logger.error('Elasticsearch request failed on bulk index', error)
      throw error
    }
  }

  async findByQuery<ResponseBody, RequestBody>(
    index: string,
    query: RequestBody,
  ) {
    try {
      const client = await this.getClient()
      return client.search<ResponseBody, RequestBody>({
        body: query,
        index,
      })
    } catch (e) {
      return ElasticService.handleError(
        'Error in ElasticService.findByQuery',
        { query, index },
        e,
      )
    }
  }

  async findById(index: string, id: string) {
    try {
      const client = await this.getClient()
      return client.get<GetByIdResponse<MappedData>>({ id, index })
    } catch (e) {
      return ElasticService.handleError(
        'Error in ElasticService.findById',
        { id, index },
        e,
      )
    }
  }

  async getDocumentsByMetaData(index: string, query: DocumentByMetaDataInput) {
    const requestBody = documentByMetaDataQuery(query)
    const data = await this.findByQuery<
      SearchResponse<MappedData>,
      typeof requestBody
    >(index, requestBody)
    return data.body
  }

  async getTagAggregation(index: string, query: TagAggregationInput) {
    const requestBody = tagAggregationQuery(query)
    const data = await this.findByQuery<
      SearchResponse<any, TagAggregationResponse>,
      typeof requestBody
    >(index, requestBody)
    return data.body
  }

  async getDateAggregation(index: string, query: DateAggregationInput) {
    const requestBody = dateAggregationQuery(query)
    const data = await this.findByQuery<
      SearchResponse<any, DateAggregationResponse>,
      typeof requestBody
    >(index, requestBody)
    return data.body
  }

  async search(index: SearchIndexes, query: SearchInput) {
    const { queryString, size, page, types, tags, countTag } = query

    const requestBody = searchQuery({
      queryString,
      size,
      page,
      types,
      tags,
      countTag,
    })

    return this.findByQuery<
      SearchResponse<MappedData, TagAggregationResponse>,
      typeof requestBody
    >(index, requestBody)
  }

  async fetchAutocompleteTerm(
    index: SearchIndexes,
    input: AutocompleteTermInput,
  ): Promise<AutocompleteTermResponse> {
    const { singleTerm, size } = input
    const requestBody = autocompleteTermQuery({ singleTerm, size })

    const data = await this.findByQuery<
      AutocompleteTermResponse,
      typeof requestBody
    >(index, requestBody)

    return data.body
  }

  async deleteByIds(index: SearchIndexes, ids: Array<string>) {
    // In case we get an empty list, ES will match that to all records... which we don't want to delete
    if (!ids.length) {
      return
    }
    const client = await this.getClient()
    return client.delete_by_query({
      index: index,
      body: {
        query: {
          bool: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            must: ids.map((id) => ({ match: { _id: id } })),
          },
        },
      },
    })
  }

  async deleteAllExcept(index: string, excludeIds: Array<string>) {
    const client = await this.getClient()

    return client.delete_by_query({
      index: index,
      body: {
        query: {
          bool: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            must_not: excludeIds.map((id) => ({ match: { _id: id } })),
          },
        },
      },
    })
  }

  async ping() {
    const client = await this.getClient()
    const result = await client.ping().catch((error) => {
      ElasticService.handleError('Error in ping', {}, error)
    })
    logger.info('Got elasticsearch ping response')
    return result
  }

  async getClient(): Promise<Client> {
    if (this.client) {
      return this.client
    }
    this.client = await this.createEsClient()
    return this.client
  }

  async createEsClient(): Promise<Client> {
    const hasAWS =
      'AWS_WEB_IDENTITY_TOKEN_FILE' in process.env ||
      'AWS_SECRET_ACCESS_KEY' in process.env

    logger.info('Create AWS ES Client', {
      esConfig: elastic,
      withAWS: hasAWS,
    })

    if (!hasAWS) {
      return new Client({
        node: elastic.node,
      })
    }

    return new Client({
      ...AwsConnector(AWS.config),
      node: elastic.node,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleError(message: string, context: any, error: any): never {
    ElasticService.logError(message, context, error)
    throw new Error(message)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static logError(message: string, context: any, error: any) {
    const errorCtx = {
      error: {
        message: error.message,
        reason: error.error?.meta?.body?.error?.reason,
        status: error.error?.meta?.body?.status,
        statusCode: error.error?.meta?.statusCode,
      },
    }

    logger.error(message, merge(context, errorCtx))
  }
}
