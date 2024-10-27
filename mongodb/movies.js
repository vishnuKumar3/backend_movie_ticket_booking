const {movies} = require("../models/movieModel");

const insertOne = async (data, callback)=>{
  try{
    console.log("data before",data);
    let res = await movies.insertMany([data])
    console.log("movie - insert operation",res);
    callback(null, res)
  }
  catch(err){
    console.log("movie - error occurred while signup",err)
    callback(err,{})
  }
}

const findByQuery = async(query, projection, callback)=>{
  try{
    let res = await movies.find(query, projection)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

const findOneByQuery = async(query, callback)=>{
  try{
    let res = await movies.findOne(query)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

exports.insertOne = insertOne;
exports.findByQuery = findByQuery;
exports.findOneByQuery = findOneByQuery;