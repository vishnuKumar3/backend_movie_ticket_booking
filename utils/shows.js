const async = require("async");
const mongodb = require("../mongodb");
const {ObjectId} = require("mongodb")
const moment = require("moment")
const {addTimeStamps}  =require("./commonFunctions")

const fetchShowTheatres = (req, callback)=>{
  let reqBody = req.body;
  const response = {
    status:'success',
    theatres:[
      {
        theatreId:"2345",
        theatreName:"INOX varun beach, Maharanipet, Vizag",
        enableBooking:true,
        startsFrom:"",
        endOn:"",
        showTimings:["11:15","13:30","15:30"]
      },
      {
        theatreId:"2345",
        theatreName:"INOX varun beach, Maharanipet, Vizag",
        enableBooking:true,
        startsFrom:"",
        endOn:"",
        showTimings:["11:15","13:30","15:30"]
      },
      {
        theatreId:"2345",
        theatreName:"INOX varun beach, Maharanipet, Vizag",
        enableBooking:true,
        startsFrom:"",
        endOn:"",
        showTimings:["11:15","13:30","15:30"]
      },
      {
        theatreId:"2345",
        theatreName:"INOX varun beach, Maharanipet, Vizag",
        enableBooking:true,
        startsFrom:"",
        endOn:"",
        showTimings:["11:15","13:30","15:30"]
      },                  
    ]
    };

  async.waterfall([
    function(triggerCallback){
      triggerCallback(null,response)
    }
  ],
  function(err, result){
    callback(err, result);
  })  
}

const addShow = (req, callback)=>{
  let reqBody = req.body;
  if(reqBody.movieId && reqBody.theatreId && reqBody.languageId && reqBody.ticketPrice && reqBody.startsFrom && reqBody.endsOn && reqBody.showTime){
    async.waterfall([
      function(triggerCallback){
        const criteria = {movieId: reqBody.movieId};
        mongodb.movies.findOneByQuery(criteria,function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching movie info"
            })
          }
          else{
            triggerCallback(null, result)
          }
        })
      },
      function(movieInfo, triggerCallback){
        const criteria = {theatreId: reqBody.theatreId};
        mongodb.theatres.findOneByQuery(criteria,function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching theatre info"
            })
          }
          else{
            triggerCallback(null, movieInfo, result)
          }
        })
      },
      function(movieInfo, theatreInfo, triggerCallback){
        const criteria = {languageId: reqBody.languageId};
        mongodb.languages.findOneByQuery(criteria,function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching language info"
            })
          }
          else{
            triggerCallback(null, movieInfo, theatreInfo, result)
          }
        })
      },
      function(movieInfo, theatreInfo, languageInfo, triggerCallback){
        let startsFrom = moment(reqBody.startsFrom);
        let endsOn = moment(reqBody.endsOn);
        let records = []
        let defaultData = {
          movieId:reqBody.movieId,
          theatreId:reqBody.theatreId,
          languageId:reqBody.theatreId,
          ticketPrice:reqBody.ticketPrice,
          showTime:reqBody.showTime,
          seatStructure:theatreInfo.seatStructure
        }
        while(startsFrom.toDate() <= endsOn.toDate()){
          let showId = new ObjectId();

          let recordStructure = {
            _id:showId,
            showId:showId.toHexString(),
            showDate:startsFrom.toDate()
          }
          Object.assign(recordStructure,defaultData);
          recordStructure = addTimeStamps(recordStructure)
          records.push(recordStructure);
          startsFrom = startsFrom.add(1,"d")
        }
        mongodb.shows.insertMany(records, function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while inserting show record"
            })
          }
          else{
            triggerCallback(null,{
              status:"success",
              message:"Successfully inserted show records in the mentioned timings"
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

exports.fetchShowTheatres = fetchShowTheatres;
exports.addShow = addShow;