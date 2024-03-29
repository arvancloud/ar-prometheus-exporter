# CDN Prometheus exporter

[![Release](https://github.com/arvancloud/ar-prometheus-exporter/actions/workflows/release.yml/badge.svg)](https://github.com/arvancloud/ar-prometheus-exporter/actions/workflows/release.yml) ![Docker Image Size (latest semver)](https://img.shields.io/docker/image-size/r1cloud/cdn-exporter?sort=semver)

![logo](.github/logo.svg)

A very simple Prometheus exporter that exposes metrics from ArvanCloud CDN API as described in the [documentation](https://www.arvancloud.ir/api/cdn/4.0).

## How-to

You can run the exporter using Docker:

```bash
docker run -d \
 -p 9786:9786 \
 -e DOMAINS=example.com,example.ir \
 -e API_KEY=TOKEN_HERE \
 r1cloud/cdn-exporter
```

### Config

| Name              | Description                                          |                Type                 |              Default               |
| :---------------- | :--------------------------------------------------- | :---------------------------------: | :--------------------------------: |
| `MODE`            | metrics collector mode                               |        enum(ACTIVE, PASSIVE)        |              PASSIVE               |
| `PORT`            | listening port                                       |               number                |                9786                |
| `API_KEY`         | your Arvan API-Key                                   |               string                |                 -                  |
| `DOMAINS`         | list of domain wants to scrape metrics               |    string or comma separate list    |                 -                  |
| `UPDATE_INTERVAL` | update metrics interval (only valid in passive mode) |        number(milliseconds)         |               30000                |
| `BASE_URL`        | Arvan base URL                                       |               string                | <https://napi.arvancloud.ir/cdn/4.0> |
| `METRICS_PERIOD`  | Arvan report period                                  | enum(1h, 3h, 6h, 12h, 24h, 7d, 30d) |                 3h                 |
| `METRICS_PREFIX`  | exported metrics prefix                              |               string                |         `arvancloud_cdn_`          |
| `METRICS` | list of metrics wants to scrape ( Select from ID fields ) | string or comma separate list | `all` |

### Metrics

The exporter exposes the following metrics, all returned per PoP:

| Name                                  | ID | Description                           |  Type   |
| :------------------------------------ | :- | :------------------------------------ | :-----: |
| `arvancloud_cdn_update_metrics_error` |  - |number of exporter errors             | counter |
| `arvancloud_cdn_requests`             | `traffic` | number of requests                    |  gauge  |
| `arvancloud_cdn_traffic`              | `traffic` | traffic served by ArvanCloud          |  gauge  |
| `arvancloud_cdn_visitors`             | `visitors` | number of unique visitors             |  gauge  |
| `arvancloud_cdn_high_request_ips`     | `high-request-ips` | high request ips                      |  gauge  |
| `arvancloud_cdn_requests_by_country`  | `geo` | number of request by country          |  gauge  |
| `arvancloud_cdn_traffic_by_country`   | `geo` | traffic by country                    |  gauge  |
| `arvancloud_cdn_response_time`        | `response-time` | response time                         |  gauge  |
| `arvancloud_cdn_requests_by_status`   | `status-code` | number of request by HTTP status code |  gauge  |

> **Note**: The `high-request-ips` metric is available in **Professional** plan and higher.

