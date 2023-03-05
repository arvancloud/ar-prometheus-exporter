const ArvanExporter = require('./arvanexporter');
const { API_KEY, PORT, DOMAINS, MODE } = require('./config');
const app = require('express')();
const pino = require('pino-http')();
const promClient = require('prom-client');

const exporter = new ArvanExporter(API_KEY, DOMAINS, MODE);
const contentType = promClient.register.contentType;

app.use(pino);

app.use(async (req, res) => {
  try {
    res.set('Content-Type', contentType);
    const metrics = await exporter.scrapeMetrics();
    res.send(metrics);
  } catch (err) {
    console.error(`Error scraping metrics: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Exporter listening at port ${PORT}`);
});
