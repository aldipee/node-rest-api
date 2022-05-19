/* eslint-disable prefer-rest-params */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const redis = require('redis');
const logger = require('../config/logger');
const config = require('../config/config');

let client;
if (config.redis.useLocal === 'true') {
  client = redis.createClient();
  logger.info('Connecting to local redis');
} else {
  logger.info('Connecting to redis');
  client = redis.createClient({
    url: config.redis.url,
    password: config.redis.password,
    retry_strategy: () => 1000,
  });
}

(async () => {
  client.on('error', (err) => logger.error('Redis Client Error', err));
  await client.connect();
  logger.info('Connected to Redis');
})();

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = { time: 60 }) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    const result = await exec.apply(this, arguments);
    return result;
  }

  const key = JSON.stringify({
    ...this.getOptions(),
  });

  const cacheValue = await client.hGet(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return doc;
    // return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }
  const result = await exec.apply(this, arguments);
  client.hSet(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);

  return result;
};

module.exports = {
  mongoose,
  clearKey(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
