const ArvanExporter = require('./arvanexporter')
const { API_KEY, PORT, DOMAINS, MODE } = require('./config')
const app = require('express')()
const pino = require('pino-http')()
const promClient = require('prom-client')

const exporter = new ArvanExporter(API_KEY, DOMAINS, MODE)

app.use(pino)
app.use(async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.send(await exporter.scrapeMetrics())
})

app.listen(PORT, () => {
  console.log(`Exporter listening at port ${PORT}`)
})
