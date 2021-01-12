const ArvanClient = require('./arvanclient')
const Prometheus = require('prom-client')

class CDNExporter {
  constructor(apiKey, domains, mode) {
    this.arvanClient = new ArvanClient(apiKey)

    this.requests = new Prometheus.Gauge({
      name: 'requests',
      help: 'request counts',
      labelNames: ['domain'],
    })

    this.traffic = new Prometheus.Gauge({
      name: 'traffic',
      help: 'traffic served',
      labelNames: ['domain'],
    })

    this.visitors = new Prometheus.Gauge({
      name: 'visitors',
      help: 'unique visitors',
      labelNames: ['domain'],
    })

    this.highRequestIps = new Prometheus.Gauge({
      name: 'high_request_ips',
      help: 'top ips with highest requests',
      labelNames: ['domain', 'ip'],
    })

    this.requestsByCountry = new Prometheus.Gauge({
      name: 'requests_by_country',
      help: 'request counter by country',
      labelNames: ['domain', 'country_code', 'country_name'],
    })

    this.trafficByCountry = new Prometheus.Gauge({
      name: 'traffic_by_country',
      help: 'request counter by country',
      labelNames: ['domain', 'country_code', 'country_name'],
    })

    this.responseTime = new Prometheus.Gauge({
      name: 'response_time',
      help: 'response time',
      labelNames: ['domain'],
    })

    this.requestByStatus = new Prometheus.Gauge({
      name: 'requests_by_status',
      help: 'requests by status code',
      labelNames: ['domain', 'status'],
    })
  }

  async scrapeMetrics() {

  }
}

module.exports = CDNExporter
