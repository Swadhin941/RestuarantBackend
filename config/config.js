const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 4000;
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.wxzkvmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const jwt = require("jsonwebtoken");
const store_id= process.env.storeId;
const store_pass= process.env.storePass;
const is_live= false;
const SSLCommerzPayment = require("sslcommerz-lts");
module.exports = { port, client, jwt, ObjectId, store_id, store_pass, is_live, SSLCommerzPayment };
