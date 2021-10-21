/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

// We want to extract the port to publish our app on
let port = process.env.PORT || 8080;

// Then we'll pull in the database client library
const pg = require("pg");

// Route for a health check
app.get('/healthz', function(req, res) {
    res.send('OK!');
});

let credentials = JSON.parse(process.env.postgresbinding);

// if (process.env.postgresbinding) {
//     console.log(process.env.postgresbinding)
//     credentials = JSON.parse(process.env.postgresbinding);
// }

app.listen(port, function() {
    console.log(credentials.postgres);
});

const IBM = require('ibm-cos-sdk');

let coscredentials = process.env.ibmcos

var config = {
    endpoint: process.env.endpoint,
    apiKeyId: process.env.apikey,
    serviceInstanceId: process.env.crn,
    signatureVersion: 'iam',
};

var bucketName = process.env.bucket;

var cos = new IBM.S3(config);

function createTextFile(bucketName, fileText) {
    console.log(`Creating new item: nodejsbinding`);
    return cos.putObject({
        Bucket: bucketName, 
        Key: nodejsbinding, 
        Body: process.env.postgresbinding
    }).promise()
    .then(() => {
        console.log(`Item: ${itemName} created!`);
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}