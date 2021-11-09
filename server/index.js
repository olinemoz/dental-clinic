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
        // console.log("Database Connected Successfully!")
        const database = client.db("doctor's_portal");
        const appointmentCollections = database.collection("appointments");
        const usersCollections = database.collection("users");

        // Api Operations

        app.get('/appointments', async (req, res) => {
            const email = req.query.email;
            const date = new Date(req.query.date).toLocaleDateString()
            const query = {email: email, date: date}
            const cursor = appointmentCollections.find(query);
            const appointments = await cursor.toArray()
            res.json(appointments)
        })

        app.post('/appointments', async (req, res) => {
            const appointment = req.body
            const result = await appointmentCollections.insertOne(appointment);
            res.json(result)
        })

        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollections.insertOne(user);
            res.json(result)
        })

        app.put('/users', async (req, res) => {
                const user = req.body
                const filter = {email: user.email}
                const options = {upsert: true}
                const updateDoc = {$set: user}
                const result = await usersCollections.updateOne(filter, updateDoc, options)
                res.json(result)
            }
        )

        app.put('/users/admin', async (req, res) => {
            const user = req.body
            const filter = {email: user.email}
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollections.updateOne(filter, updateDoc)
            res.json(result)
        })


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