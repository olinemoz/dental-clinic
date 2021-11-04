const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const cors = require('cors');
require('dotenv').config()


const PORT = process.env.PORT || 5000

//Database Integration
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-practice.upqpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// Middlewares
app.use(cors())
app.use(express.json());


// Database Operations
async function run() {
    try {
        await client.connect();
        console.log("Database Connected Successfully!")


    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello from Doctor's Portal")
})

app.listen(PORT, () => {
    console.log('Server Started Successfully on ', PORT);
})