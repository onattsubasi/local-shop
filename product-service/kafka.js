const { Kafka } = require("kafkajs");

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
    clientId: "Product-Service",
    brokers: ['localhost:9092'],
  });

  kafkaProducer = kafkaClient.producer();

  try {
    await kafkaProducer.connect();
    console.log("kafka producer connected");
  } catch (err) {
    console.log("kafka producer can not connect", err);
  }
};

const createConsumer = (topic) => {
  // { groupId: "booker-service-" + topic }  
  const consumer = kafkaClient.consumer({ groupId: "product-service-"+topic}  );
  consumers.push(consumer);
  return consumer;
};

const closeKafka = async () => {
  console.log("Disconnecting Kafka producers and consumers...");
  if (kafkaProducer) await kafkaProducer.disconnect();
  consumers.forEach(async (consumer) => {
    await consumer.disconnect();
  });
  consumers = [];
};

module.exports = { connectToKafka, sendMessageToKafka, createConsumer, closeKafka };

