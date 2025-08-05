const mongoose = require("mongoose")
require("dotenv").config()
const uri = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.MONGODB_PASSWORD}@${process.env.DB_CLUSTER_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster-one`

const connectToMongo = async () =>{

    try{
        await mongoose.connect(uri)
        console.log("Connected to mongo")
    }catch(e){
        console.log("error connecting to db" , e.message)
    }
}

module.exports = connectToMongo