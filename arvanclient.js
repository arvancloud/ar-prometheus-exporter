const axios = require('axios')
const { BASE_URL, METRICS_PERIOD } = require('./config')

class ArvanClient {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRhYzU0YTU5ODZjMWI1NGU2NWFlNjBiYzdjMmUzZTQxMWQzYzNiMGU3ZGFkYzhjZDU1Yzc4MmM1M2Y4NTVkYjljNzI5MTQ0YzY0M2I2NGVhIn0.eyJhdWQiOiI2NDMyNTU5MS02YmU4LTQyZGQtYTJlOC0xNDMzMjViNjM2ZmIiLCJqdGkiOiI0YWM1NGE1OTg2YzFiNTRlNjVhZTYwYmM3YzJlM2U0MTFkM2MzYjBlN2RhZGM4Y2Q1NWM3ODJjNTNmODU1ZGI5YzcyOTE0NGM2NDNiNjRlYSIsImlhdCI6MTYxMDQ1NDI2NiwibmJmIjoxNjEwNDU0MjY2LCJleHAiOjE2MTA1NDA2NjYsInN1YiI6IjE1YzAwMThjLTRjYzctNDJhZi04ZTA1LTU2M2IyMGU2ZjIyMyIsInNjb3BlcyI6W119.1VufBmAsVtP9xclU4iZwibdHy80LvNaDphKNNRtik9IQtdA08-IwDHM7MPlxkX3tWs0j0nxQ0G1kwSCTxjLRAUFc1E7WfGc_GE57kfrOefOcOWTt92a3ofCsZcLUF9o79DJ0pzlPSOBPs6KYHJXe7ZCqX-yA6kzuG2K-SZxhRMYmsWl71JMDXj12UuxuWqeOcTS7X_gheH0WeC-G04jKuPYq8_BsIi8IZLHeUFvUEmoA3OAgeEV5ejOO7HIzq_pNoCo-iy9JZwFihFy2yAbeYDafdLwXEoKzJSAfzzGbwM45_jgJO1TK20ksYpPAXcJbHHQJ6ofacl4y2NNyWkC1Yxk7iAxndW7gTeis2O3vhvx9MAAWxTUODo1OsV9sYbtAd1sEdS4pe9hHXEl2ue14yvYkRQzpF6RXcqS3X9hsFepJgIdnbbe8gKJNlSFq4sDUu1j_tNbruf-z1KwN6rL4IS49BkEDH73jZUKPGE3gDX_i2VGJI_CrDH1SPzLJU7iPxRa4Tgj7mvtWR4iMIt7egzrLxJdd7-PdufWb9UsBOc2vk0nMuxlH_T3e46zBNomU0BMM_q9RmX5cJLSXqDQQv26l0E4EHmJH323nG6lVIh0J41qN9Adhnjm2arM1-Ct2mdxkuPKcRY8qM7u3Xv1-DUO1k6pxDrPKt5F3lNZZ9vU',
      }
    });
  }

  async getDomains() {
  }

  async getTrafficReport(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/traffics?period=${METRICS_PERIOD}`)
    const latestTrafficReport = req.data.data.charts.traffics.series
    const totalTraffic = latestTrafficReport.find(obj => obj.name === 'reports.traffics.total').data
    const savedTraffic = latestTrafficReport.find(obj => obj.name === 'reports.traffics.saved').data

    const latestRequestsReport = req.data.data.charts.requests.series
    const totalRequests = latestRequestsReport.find(obj => obj.name === 'reports.requests.total').data
    const savedRequests = latestRequestsReport.find(obj => obj.name === 'reports.requests.saved').data

    return {
      traffic: {
        total: totalTraffic[totalTraffic.length - 1],
        saved: savedTraffic[savedTraffic.length - 1],
      },
      requests: {
        total: totalRequests[totalRequests.length - 1],
        saved: savedRequests[savedRequests.length - 1],
      }
    }
  }

  async getUniqueVisitorsReport(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/visitors?period=${METRICS_PERIOD}`)
    const latestVisitorsReport = req.data.data.charts.visitors.series
    const visitors = latestVisitorsReport.find(obj => obj.name === 'reports.visitor.visitors').data

    return {
      visitors: visitors[visitors.length - 1]
    }
  }

  async getHighRequestIps(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/high-request-ips?period=${METRICS_PERIOD}`)
    return req.data.data.map(info => ({ip: info.ip, requestCount: info.request_count}))
  }

  async getGeoTrafficReport(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/traffics/map?period=${METRICS_PERIOD}`)
    return req.data.data.lists.map(info => ({
      code: info.country,
      name: info.name,
      traffics: info.traffics,
      requests: info.requests
    }))
  }

  async getResponseTimeReport(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/response-time?period=${METRICS_PERIOD}`)

    const latestResponseTimeReport = req.data.data.charts.ir.series
    const responseTime = latestResponseTimeReport.find(obj => obj.name === 'reports.response_time.Server').data

    return {
      responseTime: responseTime[responseTime.length - 1]
    }
  }

  async getStatusCodeReport(domain) {
    const req = await this.client.get(`/domains/${domain}/reports/status?period=${METRICS_PERIOD}`)

    const statusCodes = req.data.data.statistics.status_codes
    return {
      '1xx': statusCodes['1xx_sum'] || 0,
      '2xx': statusCodes['2xx_sum'] || 0,
      '3xx': statusCodes['3xx_sum'] || 0,
      '4xx': statusCodes['4xx_sum'] || 0,
      '5xx': statusCodes['5xx_sum'] || 0,
    }
  }
}

module.exports = ArvanClient
