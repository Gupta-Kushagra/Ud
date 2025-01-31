const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = process.env.MONGO_URI || "mongodb+srv://kushagragupta9793:xG9IaCz9zOTNpHsC@cluster1.jat4f.mongodb.net/?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true
});

const app = express();
const port = process.env.PORT || 3000;
const dbName = 'passop';

app.use(bodyparser.json());
app.use(cors());

// Ensure MongoDB is connected before handling requests
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}

connectDB();

// GET request
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// POST request
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
});

// DELETE request
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
