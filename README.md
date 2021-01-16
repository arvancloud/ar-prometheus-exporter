# ar-prometheus-exporter
ArvanCloud CDN Analytics Prometheus Exporter

A very simple Prometheus exporter that exposes metrics from ArvanCloud colocations API as described in the [API documentation](https://www.arvancloud.com/docs/api/cdn/4.0).

 
### Try it

Running the container:
```
docker run \
 -d \
 -p 9097:9097 \
 -e DOMAINS=example.com,example.ir \
 -e API_KEY=TOKEN_HERE \
 sadeghhayeri/ar-exporter:v0.1.0
```

### Metrics
The exporter exposes the following metrics, all returned per PoP:

| Name                                 | Description                                               |  Type |
|:-------------------------------------|:----------------------------------------------------------|:-----:|
| `update_metrics_error`   | number of exporter errors | counter |
| `requests`     | number of requests  | gauge |
| `traffic` | traffic served by ArvanCloud                       | gauge |
| `visitors`        | number of unique visitors | gauge |
| `high_request_ips`        | high request ips                                     | gauge |
| `requests_by_country`    | number of request by country                                 | gauge |
| `traffic_by_country`      | traffic by country                      | gauge |
| `response_time`            | response time                     | gauge |
| `requests_by_status`               | number of request by HTTP status code                   | gauge |


### Config

| Name                                 | Description                                               |  Type | Default
|:-------------------------------------|:----------------------------------------------------------|:-----:|:--------:|
| `MODE` | metrics collector mode | enum(ACTIVE, PASSIVE) | PASSIVE
| `PORT` | listening port  | number | 9097
| `API_KEY` | your Arvan API-Key | string | -
| `DOMAINS` | list of domain wants to scrape metrics | string or comma separate list | -
| `UPDATE_INTERVAL` | update metrics interval (only valid in passive mode) | number(milliseconds) | 30000
| `BASE_URL` | Arvan base URL | string | https://napi.arvancloud.com/cdn/4.0
| `METRICS_PERIOD` | Arvan report period | enum(1h, 3h, 6h, 12h, 24h, 7d, 30d) | 3h

---

# Brief
A Prometheus exporter that exposes metrics from ArvanCloud's API as described in the API documentation.

## Input
User API Token available in ArvanCloud panel

## Capabalities
* Prometheus Exporter

## Useful Link
[CDN API Documentation](https://www.arvancloud.com/docs/api/cdn/4.0)

[CloudFlare Prometheus Exporter](https://github.com/wehkamp/docker-prometheus-cloudflare-exporter)


## Terms and Conditions
* All projects received to ArvanCloud will be reviewed, and the price will be paid to the first approved project.
* All projects have to have test and execution document.
* The project doer has to solve issues and apply required changes for 6 months after approval of the project.
* General changes or changing programming language in each project has to be approved by ArvanCloud.
* In case more than one project is approved by ArvanCLoud, the project fee will be equally divided between winning projects.
* In the evaluation and code reviews stages of a project, no new request for the same project will be accepted. In case the reviewed project fails to pass the quality assessments, the project will be reactivated.
* If projects require any update or edit, merge requests will be accepted in GitHub after reassessment and reapproval.
* Approved projects will be forked in GitHub, and ArvanCloud will star them.
* GitHub name and address of the approved project doer will be published alongside the project. 
