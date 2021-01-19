import { logger } from '@island.is/logging'
import { environment } from '../environments/environment'
import * as aws from './lib/aws'
import * as dictionary from './lib/dictionary'

const { locales } = environment

class App {
  public async run(): Promise<boolean> {
    logger.info('Starting migration of dictionaries to AWS')

    /*
    we want to get packages after a given version (github sha)
    this allows us to upload all versions since last sync
    */
    const dictionaryVersions = dictionary.getDictionaryVersions() // returns versions of the dictionary in order with the newest version first
    const latestAwsDictionaryVersion = await aws.getFirstFoundAwsEsPackageVersion(
      dictionaryVersions,
    )
    const newDictionaryFiles = await dictionary.getDictionaryFilesAfterVersion(
      latestAwsDictionaryVersion,
    )

    // if we have packages we should add them (s3 -> AWS ES -> AWS ES search domain)
    if (newDictionaryFiles.length) {
      logger.info('Found new dictionary packages, uploading to AWS', {
        packages: newDictionaryFiles,
      })
      const s3Files = await aws.uploadS3DictionaryFiles(newDictionaryFiles) // upload repo files to s3
      const newEsPackages = await aws.createAwsEsPackages(s3Files) // create the dictionary packages files in AWS ES
      await aws.associatePackagesWithAwsEsSearchDomain(newEsPackages) // attach the new packages to our AWS ES search domain
    }

    logger.info('Aws migration completed')
    return true
  }
}

async function migrateBootstrap() {
  const app = new App()
  await app.run()
}

migrateBootstrap().catch((error) => {
  logger.error('ERROR: ', error)
  // take down container on error to prevent this search indexer from going live
  throw error
})

// TODO: Add config to helm
