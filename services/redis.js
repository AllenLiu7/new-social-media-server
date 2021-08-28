const redis = require('redis');

const createClient = () => {
  const client = redis
    .createClient({
      port: 14042,
      host: 'redis-14042.c1.asia-northeast1-1.gce.cloud.redislabs.com',
      password: 'Fbml8T86HBxHKtPF6ddSRgt22lDCzpTE',
    })
    .on('connect', function () {
      console.log('Redis connection ready!');
    })
    .on('error', (err) => {
      console.error(err);
    });

  return client;
};

module.exports = createClient;
