const { promisifyAll } = require('bluebird')
const redis = require('redis')
const mongoose = require('mongoose')
const { stringifyFilter } = require('@/utils')
let redisUrl = process.env.REDIS_PROD_URL || process.env.REDIS_DEV_URL
let redisClient

if (redisUrl) {
  redisClient = redis.createClient(redisUrl)

  redisClient.on('connect', () => {
    log.info('Connected to cache database!')
  })

  redisClient.on('error', (err) => {
    log.error('Error:', err)
    process.exit(1)
  })
}

promisifyAll(redis.RedisClient.prototype)

module.exports.configCache = async (app) => {
  const exec = mongoose.Query.prototype.exec

  if (app.config.redisUrl && app.config.redisPass) {
    redisClient.auth(app.config.redisPass)
  }

  mongoose.Query.prototype.cache = function (options = {}) {
    if (app.config.redisUrl) {
      this.useCache = true
      this.hashKey = JSON.stringify(options.key || '')
      this.cacheExpTime = options.exp || parseInt(app.config.redisExp)
    }

    return this
  }

  mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
      return exec.apply(this, arguments)
    }

    const collection = this.mongooseCollection.name
    const query = this.getQuery()
    const options = this.getOptions()
    const key = JSON.stringify({ collection, query, options }, stringifyFilter)
    const cacheValue = await redisClient.hgetAsync(this.hashKey, key)

    if (cacheValue) {
      const doc = JSON.parse(cacheValue)

      return Array.isArray(doc)
        ? doc.map(d => this.model(d))
        : this.model(doc)
    }

    const result = await exec.apply(this, arguments)
    redisClient.hset(this.hashKey, key, JSON.stringify(result), 'EX', this.cacheExpTime)

    return result
  }

  app.redisClient = redisClient
}

module.exports.clearHash = (hashKey) => {
  if (redisClient) {
    redisClient.del(JSON.stringify(hashKey))
  }
}

module.exports.redisClient = redisClient
