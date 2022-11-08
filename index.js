//Importing Package and Library
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
require('dotenv').config();

//Use Middleware
app.use(cors())
app.use(express.json())

//Default or Home path of server
app.get('/', (req, res) => {
    res.send('Ph_Grapher server is running')
})

//MongoDB Client
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z9hjm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Client Start Function
const run = async () => {
    const database = client.db('phGrapherDB');
    const serviceCollection = database.collection('services')

    //Get All Services
    app.get('/services', async(req, res) => {
        const query = {}
        const services = await serviceCollection.find(query).toArray();
        res.send(services)
    })

    //Get a Single Service
    app.get('/service/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await serviceCollection.findOne(query);
        res.send(service)
    })
}
//Client Start
run().catch(err => console.log(err))

//Listen server on PORT 
app.listen(port, () => {
    console.log(`Ph_Grapher server is running on ${port}`);
})