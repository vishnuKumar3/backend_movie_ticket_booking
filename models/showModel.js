const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const showModel = new mongoose.Schema({
  _id:{
    type:Schema.Types.ObjectId,
    required:true
  },   
  showId:{
    type:String,
    required:true
  },  
  movieId:{
    type:String,
    required:true
  },
  theatreId:{
    type:String,
    required:true
  },  
  languageId:{
    type:String,
    required:true
  },  
  showDate:{
    type:Date,
    required:true
  }, 
  showTime:{
    type:String,
    required:true
  },
  ticketPrice:{
    type:Number,
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
  }  })

exports.shows = mongoose.model("shows",showModel)
