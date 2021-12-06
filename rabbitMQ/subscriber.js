// invoke this file after invoking the 'publisher' program to recieve messages. 

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
        channel.assertQueue(queueName, { durable: false });
        channel.consume(queueName, (message) => {
            console.log("Received Message - ", message.content.toString())
            channel.ack(message);
        })
    })
})