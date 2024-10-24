const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    _id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    userId:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true
    },
    avatarInfo:{
        type:Object
    },
    createdAt:{
        type:String,
        required:true
    },
    createdAtUnixTime:{
        type:Number,
        required:true
    },
    createdAtStr:{
        type:String,
        required:true
    },    
})

exports.users = mongoose.model("users",User)
