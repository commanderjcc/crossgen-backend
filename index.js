import "dotenv/config.js";
import fetch from "node-fetch";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import express from "express";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC82qIhdWn8aVxolSYELd5TorMxFUld8dY",
    authDomain: "crossgen-ec7ee.firebaseapp.com",
    projectId: "crossgen-ec7ee",
    storageBucket: "crossgen-ec7ee.appspot.com",
    messagingSenderId: "522075451282",
    appId: "1:522075451282:web:4c5d1a460804acd56d9b4b",
    measurementId: "G-9SDEMBKLTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

let userCredential = await signInWithEmailAndPassword(auth, "jj1355810@gmail.com", "7701crossgenmiddleman")

let idToken = await userCredential.user.getIdToken(/* forceRefresh */ true).catch(function (error) {
    console.log(error)
});



const expressapp = express();

expressapp.get("/", async (req, res) => {
    let url = req.params?.url;

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

    console.log(response)
});





