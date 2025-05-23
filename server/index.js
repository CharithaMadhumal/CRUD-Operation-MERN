const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors())
app.use(express.json())

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

//read

app.get("/",async(req,res)=>{
    const data = await userModel.find()

    res.json({success : true, data : data})
})

//create data

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success : true, message : "data created", data : data})
})

//update data

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id : id},rest)
    res.send({success : true, message : "data updated", data : data})
})

//delete data





mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})

.catch((err)=>console.log(err))



