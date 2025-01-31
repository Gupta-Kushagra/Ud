
const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')


// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()
// Connection URL
const url = 'process.env.MONGO';
const client = new MongoClient(url);
const app = express()

const port = process.env.PORT
const dbName = 'passop';
app.use(bodyparser.json())
app.use(cors())



client.connect();

//get req
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//post req
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult})
})

//delete req
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult})
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
