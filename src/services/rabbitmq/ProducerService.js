/**
 * The `node:fs` module enables interacting with the file system in a
 * way modeled on standard POSIX functions.
 *
 * To use the promise-based APIs:
 *
 * ```js
 * import * as fs from 'node:fs/promises';
 * ```
 *
 * To use the callback and sync APIs:
 *
 * ```js
 * import * as fs from 'node:fs';
 * ```
 *
 * All file system operations have synchronous, callback, and promise-based
 * forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).
 * @see [source](https://github.com/nodejs/node/blob/v20.2.0/lib/fs.js)
 */

const amqp = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, messages) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    await channel.sendToQueue(queue, Buffer.from(messages));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;
