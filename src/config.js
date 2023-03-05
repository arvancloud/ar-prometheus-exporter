const dotenvParseVariables = require('dotenv-parse-variables');
const process = require('process')

// Parse environment variables using dotenv-parse-variables package
const env = dotenvParseVariables(process.env);

// Define configuration object with default values and values from environment variables
const CONFIG = {
  MODE: env.MODE || 'PASSIVE',
  PORT: env.PORT || 9786,
  API_KEY: env.API_KEY,
  DOMAINS: Array.isArray(env.DOMAINS) ? env.DOMAINS : (typeof env.DOMAINS === 'string' ? [env.DOMAINS] : []),
  UPDATE_INTERVAL: env.UPDATE_INTERVAL || 30000,
  BASE_URL: env.BASE_URL || 'https://napi.arvancloud.ir/cdn/4.0/',
  METRICS_PERIOD: env.METRICS_PERIOD || '3h',
  METRICS_PREFIX: env.METRICS_PREFIX || 'arvancloud_cdn_',
}

module.exports = CONFIG;
