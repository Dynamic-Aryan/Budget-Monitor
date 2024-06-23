const express = require('express');
const cors=require('cors');
require('dotenv').config();
const Transaction=require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
const port = 4000; // Define the port number

app.get('/api/test', (req, res) => {
  res.json({ body: 'test okbaby' }); // Corrected syntax for res.json()
});

app.post('/api/transaction', async(req, res) => {
    
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price}=req.body;
    const transaction=await Transaction.create({name,description,datetime,price})
    res.json(transaction); 
  });

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
