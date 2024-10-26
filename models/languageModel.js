const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const LanguageModel = new mongoose.Schema({
  languageId:{
    type:String,
    required:true
  },
  languageName:{
    type:String,
    required:true
  }
})

exports.languages = mongoose.model("languages",LanguageModel)
