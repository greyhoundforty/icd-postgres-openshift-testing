"use strict";
/* jshint node:true */

// Add the express web framework
const express = require("express");
const app = express();
const fs = require("fs");

// Use body-parser to handle the PUT data
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);



// Util is handy to have around, so thats why that's here.
const util = require('util')

// and so is assert
const assert = require('assert');

// Then we'll pull in the database client library
const pg = require("pg");

// Route for a health check
app.get('/healthz', function(req, res) {
    res.send('OK!');
});

let credentials = JSON.parse(process.env.postgresbinding);
let port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log(credentials.postgres);
});

const IBM = require('ibm-cos-sdk');

var config = {
    endpoint: process.env.endpoint,
    apiKeyId: process.env.apikey,
    serviceInstanceId: process.env.crn,
    signatureVersion: 'iam',
};



var cos = new IBM.S3(config);

var itemName = "postgres-binding.json";
var bucketName = process.env.bucket;
let psqlCredentials = JSON.parse(process.env.postgresbinding);

function createTextFile(bucketName, itemName) {
    console.log(`Creating new item: ${itemName}`);
    return cos.putObject({
        Bucket: bucketName, 
        Key: itemName, 
        Body: psqlCredentials 
    }).promise()
    .then(() => {
        console.log(`Item: ${itemName} created!`);
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

createTextFile();