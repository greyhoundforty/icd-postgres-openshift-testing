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
    console.log("Writing files to ICOS");
});

const IBM = require('ibm-cos-sdk');

var config = {
    endpoint: process.env.endpoint,
    apiKeyId: process.env.apikey,
    serviceInstanceId: process.env.crn,
    signatureVersion: 'iam',
};

var cos = new IBM.S3(config);

let operatorItemName = "operator-binding.json";
// let psqlCredentials = JSON.parse(process.env.postgresbinding);

function createOperatorBindingFile() {
    console.log(`Creating new item: ${operatorItemName}`);
    return cos.putObject({
        Bucket: process.env.bucket, 
        Key: operatorItemName, 
        Body: process.env.postgresbinding 
    }).promise()
    .then(() => {
        console.log(`Item: ${operatorItemName} created!`);
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

let serviceItemName = "service-binding.json";

function createServiceBindingFile() {
    console.log(`Creating new item: ${serviceItemName}`);
    return cos.putObject({
        Bucket: process.env.bucket, 
        Key: serviceItemName, 
        Body: process.env.binding-postgresql-operator-service 
    }).promise()
    .then(() => {
        console.log(`Item: ${serviceItemName} created!`);
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

createOperatorBindingFile();
createServiceBindingFile();