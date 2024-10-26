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

exports.findByQuery = findByQuery;