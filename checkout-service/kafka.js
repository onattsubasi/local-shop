const { Kafka } = require("kafkajs");

const kafkaUri = process.env.KAFKA_URI || "localhost:9092";
let kafkaProducer = null;
let kafkaClient = null;
const consumers = [];

const sendMessageToKafka = async (kafkaTopic, data) => {
  const sResult = await kafkaProducer.send({
    topic: kafkaTopic,
    messages: [{ value: JSON.stringify(data) }],
  });
  return sResult;
};

const connectToKafka = async () => {
  kafkaClient = new Kafka({
    clientId: "CHECKOUT-SERVICE",
    brokers: [kafkaUri],
  });

  kafkaProducer = kafkaClient.producer();

  try {
    await kafkaProducer.connect();
    console.log("Kafka producer is connected.");
  } catch (err) {
    console.log("Kafka producer could not connected.");
  }
};

const createConsumer = topic => {
  const consumer = kafkaClient.consumer({
    groupId: "checkout-service-" + topic,
  });
  consumers.push(consumer);
  return consumer;
};

const closeKafka = async () => {
  console.log("Disconnecting from Kafka producers and consumers...");
  if (kafkaProducer) {
    await kafkaProducer.disconnect();
  }
  consumers.forEach(async consumer => {
    await consumer.disconnect();
  });
  consumers = [];
};

module.exports = {
  sendMessageToKafka,
  closeKafka,
  createConsumer,
  connectToKafka,
};
