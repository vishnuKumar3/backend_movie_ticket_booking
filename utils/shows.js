const async = require("async");
const mongodb = require("../mongodb");
const {ObjectId} = require("mongodb")
const moment = require("moment")
const {addTimeStamps}  =require("./commonFunctions");

const fetchShow = (req, callback)=>{
  let reqBody = req.body;

  if(reqBody.showId){
    async.waterfall([
      function(triggerCallback){
        const criteria = {showId:reqBody.showId};
        mongodb.shows.findOneByQuery(criteria,{}, function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching show details"
            })
          }
          else{
            if(result){
              triggerCallback(null,{
                status:"success",
                showInfo:result
              });
            }
            else{
              triggerCallback(true,{
                status:"error",
                message:"Show not found for the given info"
              })
            }
          }
        })
      }
    ],
    function(err, result){
      callback(err, result);
    })  
  }
  else{
    callback(true,{
      status:"error",
      message:"Please provide valid details"
    })
  }
}

const fetchShowTheatres = (req, callback)=>{
  let reqBody = req.body;
  console.log("req body",reqBody);
  if(reqBody.movieId && reqBody.languageId && reqBody.showDate){
    async.waterfall([
      function(triggerCallback){
        let momentObj = moment(reqBody.showDate)
        const criteria = {movieId: reqBody.movieId, languageId: reqBody.languageId, showDate: momentObj.toDate()};
        const query = [
          {$match:criteria},
          {$group:{_id:criteria,showTimings:{$addToSet:"$showTime"},theatreId:{$first:"$theatreId"},showId:{$first:"$showId"}}},
          {$project:{_id:0}}
        ]
        mongodb.shows.aggregate(query, function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching theatre list based on show info"
            })
          }
          else{
            triggerCallback(null, result)
          }
        })
      },
      function(shows, triggerCallback){
        let theatreIds = shows.reduce((accumulator,showInfo)=>{
          accumulator.push(showInfo.theatreId);
          return accumulator;
        },[])
        mongodb.theatres.findByQuery({theatreId:{$in:theatreIds}},{seatStructure:0},function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching theatre list based on show info"
            })
          }
          else{
            let theatresObject = result.reduce((accumulator, theatreInfo)=>{
              if(theatreInfo["theatreId"]){
                accumulator[theatreInfo["theatreId"]] = theatreInfo;
                return accumulator;
              }
              else{
                return accumulator;
              }
            },{})
            triggerCallback(null, shows, theatresObject)
          }
        })
      },
      function(shows, theatresObject, triggerCallback){
        let result = shows.reduce((accumulator, showInfo)=>{
          if(showInfo["theatreId"] && theatresObject[showInfo["theatreId"]]){
            let record = JSON.parse(JSON.stringify(showInfo));
            record = Object.assign(record,{theatreInfo:theatresObject[showInfo["theatreId"]]});
            accumulator.push(record);
            return accumulator;
          }
          else{
            return accumulator;
          }
        },[])
        console.log(result)
        triggerCallback(null, {status:"success",theatres:result});
      }
    ],
    function(err, result){
      callback(err, result);
    })  
  }
  else{
    callback(true,{
      status:"error",
      message:"Please provide vaild details"
    })
  }
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
          languageId:reqBody.languageId,
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

const bookTickets = (req, callback)=>{
  let reqBody = req.body;
  if(reqBody && reqBody.selectedSeats && reqBody.showId && reqBody.userId){
    async.waterfall([
      function(triggerCallback){
        const criteria = {showId:reqBody.showId};
        mongodb.shows.findOneByQuery(criteria,{},function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while booking tickets"
            })
          }
          else{
            triggerCallback(null, result);
          }
        })
      },
      function(showInfo, triggerCallback){
        let seatStructure = JSON.parse(JSON.stringify(showInfo.seatStructure));
        let selectedSeatsInfo = reqBody.selectedSeats.reduce((accumulator, seatInfo)=>{
          if(seatInfo["rowName"] && seatInfo["seatNumber"]){
            if(accumulator[seatInfo["rowName"]]){
              accumulator[seatInfo["rowName"]].push(seatInfo["seatNumber"]);
            }
            else{
              accumulator[seatInfo["rowName"]] = [seatInfo["seatNumber"]];
            }
            return accumulator;
          }
          else{
            return accumulator;
          }
        },{})
        let resultedSeatStructure = seatStructure.reduce((accumulator, rowInfo)=>{
          if(rowInfo && rowInfo["name"] && rowInfo["seats"] && selectedSeatsInfo[rowInfo["name"]]){
            selectedSeatsInfo[rowInfo["name"]].map((bookedSeatNumber)=>{
              rowInfo["seats"][bookedSeatNumber] = 0;
            })
            accumulator.push(rowInfo);
            return accumulator;
          }
          else{
            accumulator.push(rowInfo);
            return accumulator;
          }
        },[])
        mongodb.shows.updateOne({showId:reqBody.showId},{$set:{seatStructure: resultedSeatStructure}},function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while processing the booking request"
            })
          }
          else{
            triggerCallback(null, showInfo);
          }
        })
      },
      function(showInfo, triggerCallback){
        let bookindId = new ObjectId();
        let recordToInsert = {
          _id:bookindId,
          bookingId:bookindId.toHexString(),
          showId:showInfo.showId,
          selectedSeats:reqBody.selectedSeats,
          userId:reqBody.userId,
          theatreId:showInfo.theatreId,
          movieId:showInfo.movieId
        };
        console.log("user bookings",recordToInsert)
        recordToInsert = addTimeStamps(recordToInsert);
        mongodb.userBookings.insertOne(recordToInsert,function(err, result){
          if(err){
            triggerCallback(true,{
              status:'error',
              message:"Error occurred while processing the seat booking request"
            })
          }
          else{
            triggerCallback(null,{
              status:"success",
              message:"Seat booking successfully completed"
            })
          }
        })
      }
    ],function(err, result){
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
exports.fetchShow = fetchShow;
exports.bookTickets = bookTickets;