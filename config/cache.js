const redis = require('redis')
const mongoose = require('mongoose')
const redisClient = redis.createClient()
const { promisifyAll } = require('bluebird')
const { stringifyFilter } = require('../utils')

promisifyAll(redis.RedisClient.prototype)

module.exports.configCache = async (app) => {
  const exec = mongoose.Query.prototype.exec

  mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true
    this.hashKey = JSON.stringify(options.key || '')
    this.cacheExpTime = options.exp || 60 * 15

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
    redisClient.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10)

    return result
  }

  redisClient.on('error', (err) => {
    app.logger.error('Error:', err)
  })

  redisClient.on('connect', () => {
    app.logger.info('Redis is ready!')
  })

  app.redisClient = redisClient
}

module.exports.clearHash = (hashKey) => {
  redisClient.del(JSON.stringify(hashKey))
}

module.exports.redisClient = redisClient
