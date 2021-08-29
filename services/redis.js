const redis = require('redis');

const client = redis.createClient({
  port: 14042,
  host: 'redis-14042.c1.asia-northeast1-1.gce.cloud.redislabs.com',
  password: 'Fbml8T86HBxHKtPF6ddSRgt22lDCzpTE',
});

client.on('connect', () => {
  console.log('Client connected to redis...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (err) => {
  console.log(err.message);
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

process.on('SIGINT', () => {
  client.quit();
});

module.exports = client;
