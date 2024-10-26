const {userBookings} = require("../models/userBookingsModel")

const insertOne = async (data, callback)=>{
  try{
    let res = await userBookings.insertMany([data])
    console.log("userbooking - insert operation");
    callback(null, res)
  }
  catch(err){
    console.log("userBooking - error occurred insertion",err)
    callback(err,{})
  }
}

const findByQuery = async (query, callback)=>{
  try{
    let res = await userBookings.find(query)
    console.log("userbooking - find operation");
    callback(null, res)
  }
  catch(err){
    console.log("userBooking - error occurred find",err)
    callback(err,{})
  }
}

exports.insertOne = insertOne;
exports.findByQuery = findByQuery;