const {languages} = require("..//models/languageModel");

const findByQuery = async(query, callback)=>{
  try{
    let res = await languages.find(query)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

const findOneByQuery = async(query, callback)=>{
  try{
    let res = await languages.findOne(query)
    callback(null,res);
  } 
  catch(err){
    console.log(err.message)
    callback(true, {})
  }
}

exports.findByQuery = findByQuery;
exports.findOneByQuery = findOneByQuery;