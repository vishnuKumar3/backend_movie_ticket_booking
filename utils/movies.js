const async = require("async");
const {uploadFileToS3} = require("./aws_s3")
const {ObjectId} = require("mongodb")
const moment = require("moment");
const mongodb = require("../mongodb")
const {convertArrayOfObjectsToObject,addTimeStamps} = require("./commonFunctions")

const fetchMovies = (req, callback)=>{
  let reqBody = req.body;

  async.waterfall([
    function(triggerCallback){
      mongodb.movies.findByQuery({},function(err, result){
        if(err){
          triggerCallback(true, {
            status:"error",
            message:'Error occurred while fetching movies list'
          })
        }
        else{
          triggerCallback(null, {
            status:"success",
            movies:result
          })
        }
      })
    }
  ],
  function(err, result){
    callback(err, result);
  })  
}

const addMovie = (req, callback)=>{
  let reqBody = req.body;
  let reqFiles = convertArrayOfObjectsToObject(req.files,"fieldname"); 
  if(reqBody.movieName && reqBody.genre && reqBody.duration && reqBody.releasedYear && reqBody.movieDescription && reqBody.releaseDate && reqBody.languageIDs && reqFiles["miniPoster"] && reqFiles["bigPoster"]){
    async.waterfall([
      function(triggerCallback){
        let d = new Date();
        let time = d.getTime().toString();
        let fileName = reqBody.movieName+"_"+time;
        uploadFileToS3(fileName,reqFiles["miniPoster"]?.buffer,function(err, result){
          if(result && result.status && result.status.toLowerCase() === "success"){
            reqBody["miniPoster"] = result.data
            triggerCallback(null, {})
          }
          else{
            triggerCallback(err, result)
          }
        })
      },
      function(prevResponse, triggerCallback){
        let d = new Date();
        let time = d.getTime().toString();
        let fileName = reqBody.movieName+"_"+time;
        uploadFileToS3(fileName,reqFiles["bigPoster"]?.buffer,function(err, result){
          if(result && result.status && result.status.toLowerCase() === "success"){
            reqBody["bigPoster"] = result.data
            triggerCallback(null, {})
          }
          else{
            triggerCallback(err, result)
          }
        })
      },
      function(prevResponse, triggerCallback){
        let movieId = new ObjectId()
        reqBody.languageIDs = reqBody.languageIDs.split(",") || []; 
        console.log("ids",reqBody.languageIDs)
        let releaseDateObj = moment(reqBody.releaseDate);
        reqBody._id = movieId;
        reqBody.movieId = movieId.toHexString();
        reqBody.releaseDate = releaseDateObj.toDate();
        reqBody.releaseDateAtUnixTime = releaseDateObj.valueOf();
        reqBody = addTimeStamps(reqBody);
        mongodb.movies.insertOne(reqBody, function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while adding movie"
            })
          }
          else{
            triggerCallback(null,{
              status:"success",
              message:"Successfully added the movie our database and will display in the application"
            })
          }
        })
      }      
    ],
    function(err, result){
      callback(err, result)
    })
  }
  else{
    callback(true,{
      status:"error",
      message:"Please provide valid details"
    })
  }
}

exports.fetchMovies = fetchMovies;
exports.addMovie = addMovie;