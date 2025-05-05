const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors())

const  PORT = process.env.PORT || 8080

//Schema

const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)

app.get("/",async(req,res)=>{
    const data = await userModel.find()

    res.json({success : true, data : data})
})

//create data

app.post("/create",(req,res)=>{
    console.log(req.body)

    res.send({success : true, message : "data created"})
})

mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})

.catch((err)=>console.log(err))



