import "dotenv/config.js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "crossgen-ec7ee.firebaseapp.com",
    projectId: "crossgen-ec7ee",
    storageBucket: "crossgen-ec7ee.appspot.com",
    messagingSenderId: "522075451282",
    appId: "1:522075451282:web:4c5d1a460804acd56d9b4b",
    measurementId: "G-9SDEMBKLTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

let userCredential = await signInWithEmailAndPassword(auth, process.env.EMAIL, process.env.PASSWORD)

let idToken = await userCredential.getIdToken(/* forceRefresh */ true).catch(function (error) {
    console.log(error)
});

let url = '';

const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'variable_queue';

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        channel.assertQueue(QUEUE_NAME, { durable: false });

        console.log('Waiting for variable value');

        channel.consume(QUEUE_NAME, async (message) => {
            const variable_value = message.content.toString();
            url = variable_value;
            console.log(`Received variable value: ${variable_value}`);
            channel.ack(message);

            let data = {
                "idToken": idToken,
                "url": url
            }

            const response = await fetch("https://crossgen.josh.christen.se/n/updateUrl", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });


            connection.close();
        }, { noAck: false });
    });
});



