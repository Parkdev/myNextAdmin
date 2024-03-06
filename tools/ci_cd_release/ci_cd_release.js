const { ServiceBusClient } = require("@azure/service-bus");
const { readFileSync } = require("fs");
// name of the queue
const queueName = "release-messages";

async function main(
  connectionString,
  platform_service,
  update_ring,
  image_name,
) {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString);

  try {
    const variables = readFileSync("./variables.json", "utf8");
    if (!variables) {
      throw new Error("variables.json data not found");
    }

    const messages = [
      {
        body: {
          platform_service,
          update_ring,
          image_name,
          variables: JSON.parse(variables),
        },
      },
    ];

    // createSender() can also be used to create a sender for a topic.
    const sender = sbClient.createSender(queueName);
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    // await sender.sendMessages(messages);

    // create a batch object
    let batch = await sender.createMessageBatch();
    for (let i = 0; i < messages.length; i++) {
      // for each message in the array

      // try to add the message to the batch
      if (!batch.tryAddMessage(messages[i])) {
        // if it fails to add the message to the current batch
        // send the current batch as it is full
        await sender.sendMessages(batch);

        // then, create a new batch
        batch = await sender.createMessageBatch();

        // now, add the message failed to be added to the previous batch to this batch
        if (!batch.tryAddMessage(messages[i])) {
          // if it still can't be added to the batch, the message is probably too big to fit in a batch
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    // Send the last created batch of messages to the queue
    await sender.sendMessages(batch);

    console.log(`Sent a batch of messages to the queue: ${queueName}`);

    // Close the sender
    await sender.close();
  } catch (err) {
    console.error("Error occurred: ", err);
  } finally {
    await sbClient.close();
  }
}

// index.js service_category update_ring image_name
// $1 : connectionString
// $2 : service_category
// $3 : update_ring
// $4 : image name

// call the main function
main(process.argv[2], process.argv[3], process.argv[4], process.argv[5]).catch(
  (err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
  },
);
