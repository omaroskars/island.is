import yargs from 'yargs'
import { logger } from '@island.is/logging'
import { environment } from '../environments/environment'
import * as kibana from './lib/kibana'
import * as indexManager from '@island.is/content-search-index-manager'

const { locales } = environment

class App {
  public async run() {
    logger.info('Starting kibana migration')

    try {
      const version = indexManager.getElasticVersion()
      await kibana.importObjects(version)
    } catch (e) {
      logger.error('Failed migrating kibana', e)
    }
    logger.info('Done')
  }

  async syncKibana() {
    logger.info('Starting kibana syncing')
    await kibana.syncObjects()
    logger.info('Done')
  }
}

async function migrateBootstrap() {
  const argv = yargs(process.argv).argv
  const app = new App()
  if (argv.syncKibana) {
    await app.syncKibana()
  } else {
    await app.run()
  }
}

migrateBootstrap().catch((error) => {
  logger.error('ERROR: ', error)
  // take down container on error to prevent this search indexer from going live
  throw error
})
