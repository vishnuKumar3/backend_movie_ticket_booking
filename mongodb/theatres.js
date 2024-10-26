const {theatres} = require("../models/theatreModel")

const insertOne = async (data, callback)=>{
  try{
    let res = await theatres.insertMany([data])
    console.log("theatre - insert operation",res);
    callback(null, res)
  }
  catch(err){
    console.log("theatre - error occurred while inserting theatre",err)
    callback(err,{})
  }
}

const findByQuery = async (data,projection, callback)=>{
  try{
    let res = await theatres.find(data,projection);
    console.log("theatre - find operation",res);
    callback(null, res)
  }
  catch(err){
    console.log("theatre - error occurred while fetching theatres",err)
    callback(err,{})
  }
}

const findOneByQuery = async (data, callback)=>{
  try{
    let res = await theatres.findOne(data);
    console.log("theatre - findone operation",res);
    callback(null, res)
  }
  catch(err){
    console.log("theatre - error occurred while fetching theatre",err)
    callback(err,{})
  }
}

exports.insertOne = insertOne;
exports.findByQuery = findByQuery;
exports.findOneByQuery = findOneByQuery;