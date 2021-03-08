const { expose } = require('threads/worker');

const needle = require('needle');
const config = require('./config.json');
require('events').EventEmitter.defaultMaxListeners = 0;

expose({
  get: async (url, data) => needle('get', url, data, {
    response_timeout: config.clientTimeout,
    read_timeout: config.clientTimeout,
    headers: {
      Connection: 'close',
    },
  })
    .catch(id => id)
    .then(res => res.statusCode || res.code),
});
