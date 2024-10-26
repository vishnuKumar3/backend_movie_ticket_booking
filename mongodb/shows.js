const {shows} = require("../models/showModel")

const insertOne = async (data, callback)=>{
  try{
    let res = await shows.insertMany([data])
    console.log("show - insert operation");
    callback(null, res)
  }
  catch(err){
    console.log("movie - error occurred insertion",err)
    callback(err,{})
  }
}

const insertMany = async (data, callback)=>{
  try{
    let res = await shows.insertMany(data)
    console.log("show - insertMany operation");
    callback(null, res)
  }
  catch(err){
    console.log("shows - error occurred insertMany",err)
    callback(err,{})
  }
}

exports.insertOne = insertOne;
exports.insertMany = insertMany;