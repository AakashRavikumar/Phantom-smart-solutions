// 7. RabbitMQ queueing request sample API :
  
/* Should install Erlang and rabbitmq server. Moreover, run the rabbitmq server as management and login as a guest user first
 and then run the bellow code */

// * one should run this file alone using node cmd to "publish(send)" messages to "subscriber(receiver)" file.

// * it follows queue which means how many messages sender will send always recieved by the subscriber in FIFO (first in first out ) order.

// * total hold capacity of queue depends on total free server memory or wherever the rabbitMQ broker is running.

// * after invoking this 
  const amqp = require("amqplib/callback_api");

  amqp.connect("amqp://localhost", (err, connection) => {
      if (err) {
          throw err;
      }
      connection.createChannel((err, channel) => {
          if (err) {
              throw err;
          }
          let queueName = "client";
          let message = "message from client side";
          channel.assertQueue(queueName, { durable: false }); // durable : false in the sense, even though there is no subscribers, it will publish messages
          channel.sendToQueue(queueName, Buffer.from(message));
          console.log("Message published - ", message);
          setTimeout(() => {
              connection.close();
          }, 1000) 
      })
  })