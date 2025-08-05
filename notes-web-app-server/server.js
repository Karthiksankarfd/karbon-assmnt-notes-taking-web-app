require("dotenv").config()

const express = require("express")
const app = express()
const connectToMongo = require("./dbconfig/dbConfig")
const cors = require("cors")

const authRoutes = require("./routes/googleLogin")
const createNote = require ("./routes/createNote.js")
const deleteNote = require("./routes/deleteNote.js")
const updateNote = require("./routes/editNote")
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connectToMongo();

app.get("/" , (req , res)=>{
    res.send("hello world...")
})

app.use("/api/auth" , authRoutes)
app.use("/api" , createNote)
app.use("/api" ,  deleteNote)
app.use("/api" , updateNote)
app.listen(5000 , () =>{
    console.log(`server is running on port 3000`)
})