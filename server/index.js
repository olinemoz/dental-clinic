const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const serviceAccount = require('./doctors-portal-admin-sdk.json');
const admin = require("firebase-admin");
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const fileUpload = require('express-fileupload')


const PORT = process.env.PORT || 5000


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


//Database Integration
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-practice.upqpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// Middlewares
app.use(cors())
app.use(express.json());
app.use(fileUpload())

async function verifyToken(req, res, next) {
    if (req.headers.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedemail = decodedUser.email;
        } catch {

        }
    }
    next();
}

// Database Operations
async function run() {
    try {
        await client.connect();
        // console.log("Database Connected Successfully!")
        const database = client.db("doctor's_portal");
        const appointmentCollections = database.collection("appointments");
        const usersCollections = database.collection("users");
        const doctorsCollections = database.collection("doctors");

        // Api Operations

        app.get('/appointments', verifyToken, async (req, res) => {
            const email = req.query.email;
            const date = req.query.date
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

        app.get('/appointments/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await appointmentCollections.findOne(query);
            res.json(result)
        })

        app.put('/appointments/:id', async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = {_id: ObjectId(id)};
            const updateDoc = {
                $set: {
                    payment: payment
                }
            };
            const result = await appointmentCollections.updateOne(filter, updateDoc);
            res.json(result);
        })

        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const user = await usersCollections.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({admin: isAdmin});
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

        app.put('/users/admin', verifyToken, async (req, res) => {
            const user = req.body
            const requester = req.decodedemail
            if (requester) {
                const requesterAccount = await usersCollections.findOne({email: requester})
                if (requesterAccount.role === 'admin') {
                    const filter = {email: user.email}
                    const updateDoc = {$set: {role: 'admin'}};
                    const result = await usersCollections.updateOne(filter, updateDoc)
                    res.json(result)
                }
            } else {
                res.status(403).json({message: 'Unauthorized'})
            }
        })

        app.post('/create-payment-intent', async (req, res) => {
            const paymentInfo = req.body;
            const amount = paymentInfo.price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                payment_method_types: ['card']
            });
            res.json({clientSecret: paymentIntent.client_secret})
        })

        // Doctors
        app.get('/doctors', async (req, res) => {
            const cursor = doctorsCollections.find({});
            const doctors = await cursor.toArray();
            res.json(doctors);
        });

        app.get('/doctors/:id', async (req, res) => {
            const query = {_id: ObjectId(req.params.id)}
            const doctor = await doctorsCollections.findOne(query);
            res.json(doctor);
        });

        app.post('/doctors', async (req, res) => {
            const name = req.body.name;
            const email = req.body.email;
            const pic = req.files.image;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imageBuffer = Buffer.from(encodedPic, 'base64');
            const doctor = {
                name,
                email,
                image: imageBuffer
            }
            const result = await doctorsCollections.insertOne(doctor);
            res.json(result);
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