const { spawn, Pool, Worker } = require('threads');
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const config = require('./config.json');
require('events').EventEmitter.defaultMaxListeners = 0;

const pool = Pool(() => spawn(new Worker('./worker')), {
  concurrency: config.concurrency,
});
const pause = async time => (new Promise((resolve) => {
  setTimeout(resolve, time);
}));
const loadData = async () => {
  const normalizedPath = path.join(__dirname, 'data');

  const files = await fs.readdir(normalizedPath);

  const promises = _.map(files, async (file) => {
    const content = await fs.readFile(path.join(normalizedPath, file));
    return _.split(_.trim(content.toString()), '\n');
  });

  const fileContents = await Promise.all(promises);
  return _.zip(...fileContents);
};

(async () => {
  const tuples = await loadData();

  console.log(`Concurrency is ${pool.options.concurrency}`);
  console.log(`Worker pool size is ${pool.workers.length}`);

  const batchSize = pool.options.concurrency * pool.workers.length;
  const tupleBatches = _.chunk(tuples, batchSize);
  console.log(`Resulting batch size is ${batchSize}`);
  console.log(`Total number of batches is ${tupleBatches.length}`);

  console.log(`Start time: ${(new Date()).toString()}`);
  await pause(config.pause);

  await _.reduce(tupleBatches, async (acc, batch, i) => {
    await acc;
    const promises = _.map(batch, (tuple, j) => pool.queue(async (worker) => {
      const res = await worker.get(config.url, {
        a: tuple[0],
        b: tuple[1],
      });
      return res;
    }));

    await Promise.all(promises);

    return pause(config.batchDelay);
  }, Promise.resolve());

  await pause(config.pause);
  console.log(`End time: ${(new Date()).toString()}`);

  console.log('Exiting...');
  await pool.terminate();
})();
