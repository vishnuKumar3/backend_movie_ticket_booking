const { duration } = require("moment");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const movieModel = new mongoose.Schema({
  movieId:{
    type:String,
    required:true
  },
  _id:{
    type:Schema.Types.ObjectId,
    required:true
  },  
  movieName:{
    type:String,
    required:true
  },
  genre:{
    type:String,
    required:true
  },
  duration:{
    type:Number,
    required:true
  },
  releasedYear:{
    type:Number,
    required:true
  },
  movieDescription:{
    type:String,
    required:true
  },
  releaseDate:{
    type:Date,
    required:true
  },
  releaseDateAtUnixTime:{
    type:Number,
    required:true
  },
  languageIDs:{
    type:Array,
    required:true,
  },
  miniPoster:{
    type:Object,
    required:true
  },
  bigPoster:{
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

exports.movies = mongoose.model("movies",movieModel)
