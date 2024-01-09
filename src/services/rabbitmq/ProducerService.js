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
