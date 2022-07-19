const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const mongoDB = require('mongodb')
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');
const password = encodeURIComponent('Waghkalpna@123');
const uri = `mongodb+srv://AS_Wagh:${password}@cluster0.fxoal.mongodb.net/grocery?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/',async (req, res) => {
    res.send('API Called')
})


// app.get('/user', async (req, res) => {
//     const collection = client.db("Crud-Grocery").collection("grocery");
//     const users = {ItemName: 'Wheat',  Quantity: '5 kg'}  
//     const result = await collection.insertOne(users);  
//        console.log(result);
//        res.send(result);   
// })

app.post('/grocery/add', async (req, res) => {
    
    console.log(req.body)
    const data = req.body;
    const collection = client.db("Crud-Grocery").collection("grocery");
    const result = await collection.insertOne(data);
    console.log(result)
    res.send(mainOutput)
})

app.get('/grocery/getAll', async (req, res) => {

    const collection = client.db("Crud-Grocery").collection("grocery");
    const output = await collection.find({}).toArray()
    console.log(output)
    res.send(output)
})

app.delete("/grocery/deleteGroceryItem/:id", async (req, res) => {

    console.log(req.params.id)
    const collection = client.db("Crud-Grocery").collection("grocery");
    const input = await collection.deleteOne(
        {
            _id: new mongoDB.ObjectId(req.params.id)
        }
    );
    console.log(input)
    res.send(mainOutput)
})

app.put("/grocery/updatePurchaseStatus/:id", async (req, res) => {

    console.log(req.params.id)
    const collection = client.db("Crud-Grocery").collection("grocery");
    const value = await collection.updateOne(
        {
            _id: new mongoDB.ObjectId(req.params.id)
        },
        {
            $set:   {
                       isPurchased: true
                    }
        }
    );
    console.log(value)
    res.send(mainOutput)
})

async function run() { 


}


app.listen(port, async() => {
    run().catch(console.dir)
    console.log(`API Running on ${port}`)

    client.connect( async err => {
        console.log(err);
        console.log("DataBase Connected");
        // perform actions on the collection object
        // client.close();
      });
})