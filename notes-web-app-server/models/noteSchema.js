const mongoose =  require("mongoose")

const noteSchema =  new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref:"User"} , 
    title:{type:String},
    content:{type:String},  
},
  {
    timestamps: true,
  }
)

const Note = mongoose.model('Note', noteSchema);


module.exports = Note ; 