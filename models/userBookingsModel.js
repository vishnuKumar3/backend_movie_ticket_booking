const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userBookingsModel = new mongoose.Schema({
  bookingId:{
    type:String,
    required:true
  },
  _id:{
    type:Schema.Types.ObjectId,
    required:true
  },
  userId:{
    type:String,
    required:true
  },  
  showId:{
    type:String,
    required:true
  },
  theatreId:{
    type:String,
    required:true
  },
  movieId:{
    type:String,
    required:true
  },  
  selectedSeats:{
    type:Array,
    required:true
  },//[{rowName:"B",seatNumber:"1"}]
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

exports.userBookings = mongoose.model("userBookings",userBookingsModel)
