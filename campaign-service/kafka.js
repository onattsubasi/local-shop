const {Kafka} = require("kafkajs");

let kafkaClient = null;
let kafkaProducer = null;
const kafkaConsumers = [];

const sendMessageToKafka = async (kafkaTopic, data) => {
  const sResult = await kafkaProducer.send({
    topic: kafkaTopic,
    messages: [{ value: JSON.stringify(data) }],
  });
  return sResult;
};

const connectToKafka = async () => {
  kafkaClient = new Kafka({
    clientId: "Campaign-Service",
    brokers: ["localhost:9092"],
  });

  kafkaProducer = kafkaClient.producer();

  try {
    await kafkaProducer.connect();
    console.log("kafka producer connected");
  } catch (error) {
    console.log("kafka producer can not connect", error);
  }
};

const createConsumer = (topic) => {
  // { groupId: "booker-service-" + topic }
  const consumer = kafkaClient.consumer({
    groupId: "campaign-service-" + topic,
    fromBeginning: true,
  });
  kafkaConsumers.push(consumer);
  return consumer;
};

const closeKafka = async () => {
  console.log("Disconnecting Kafka producers and consumers...");
  if (kafkaProducer) await kafkaProducer.disconnect();
  kafkaConsumers.forEach(async (consumer) => {
    await consumer.disconnect();
  });
  kafkaConsumers = [];
};

module.exports = {
  connectToKafka,
  sendMessageToKafka,
  createConsumer,
  closeKafka,
};
