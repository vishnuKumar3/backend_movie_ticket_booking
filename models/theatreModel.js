const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const theatreModel = new mongoose.Schema({
  _id:{
    type:Schema.Types.ObjectId,
    required:true
  },   
  theatreId:{
    type:String,
    required:true
  },
  theatreName:{
    type:String,
    required:true
  },
  seatingCapacity:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  seatStructure:{
    type:Object,
    required:true
  },
  createdAt:{
    type:Date,
    required:true
  },
  createdAtUnixTime:{
    type:Number,
    required:true
  },
  createdAtStr:{
    type:String,
    required:true
  }  
})

exports.theatres = mongoose.model("theatres",theatreModel)
