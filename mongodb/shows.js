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

const findByQuery = async(query, projection, callback)=>{
  try{
    let res = await shows.find(query,projection)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

const findOneByQuery = async(query, projection, callback)=>{
  try{
    let res = await shows.findOne(query,projection)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

const aggregate = async(query, callback)=>{
  try{
    let res = await shows.aggregate(query)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

const updateOne = async(query,updateInfo, callback)=>{
  try{
    let res = await shows.updateOne(query, updateInfo)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

exports.insertOne = insertOne;
exports.insertMany = insertMany;
exports.findByQuery = findByQuery;
exports.aggregate = aggregate;
exports.findOneByQuery = findOneByQuery;
exports.updateOne = updateOne;