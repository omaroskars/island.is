import express from 'express'

import { logger } from '@island.is/logging'

import { issuerRoutes, applicationRoutes } from './domains'
import {
  setupMessageQueue,
  setupSentryRequestHandler,
  setupSentryErrorHandler,
} from './extensions'

const app = express()

setupSentryRequestHandler(app)

setupMessageQueue(app)

app.use(express.json())
app.use('/issuers', issuerRoutes)
app.use('/applications', applicationRoutes)

app.get('/status', (req, res) => {
  if (req.app.get('publishToQueue')) {
    res.json({ ok: true })
  } else {
    res.status(500).json({ ok: false })
  }
})

setupSentryErrorHandler(app)

const port = process.env.port || 4242
const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`)
})
server.on('error', logger.error)
