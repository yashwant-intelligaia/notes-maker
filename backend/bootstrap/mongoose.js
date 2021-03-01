'use strict';
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "test";
module.exports = async function(app){
    await mongoose.connect((dbUrl + "/" + dbName), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}