FROM --platform=$BUILDPLATFORM node:20-alpine AS BUILDER
WORKDIR /app
COPY ./package*.json ./
RUN npm install

FROM --platform=$BUILDPLATFORM node:20-alpine AS APP

ARG APP_VERSION="undefined@docker"

LABEL \
    org.opencontainers.image.title="cdn-exporter" \
    org.opencontainers.image.description="Prometheus exporter for ArvanCloud CDN" \
    org.opencontainers.image.url="https://github.com/arvancloud/ar-prometheus-exporter" \
    org.opencontainers.image.source="https://github.com/arvancloud/ar-prometheus-exporter" \
    org.opencontainers.image.vendor="arvancloud" \
    org.opencontainers.image.author="arvancloud" \
    org.opencontainers.version="$APP_VERSION" \
    org.opencontainers.image.created="$DATE_CREATED" \
    org.opencontainers.image.licenses="MIT"

WORKDIR /app
COPY . .
COPY --from=BUILDER /app/node_modules node_modules
ENTRYPOINT ["node", "src/index.js"]
