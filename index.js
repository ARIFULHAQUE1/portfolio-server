const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wpfa3xo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    await client.connect();
    const feedbackCollection = client.db("portfolio").collection("Feedback");
    const contactCollection = client.db("portfolio").collection("contact");

    app.post('/feedback',async(req,res)=>{
      const feedback = req.body;
      const result = await feedbackCollection.insertOne(feedback);
      res.send(result);

    })

    app.post('/contact',async(req,res)=>{
      const contact = req.body;
      const result = await contactCollection.insertOne(contact);
      res.send(result);

    })

  }
  finally{

   

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`portfolio listening on port ${port}`)
})