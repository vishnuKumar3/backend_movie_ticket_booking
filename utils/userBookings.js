const async = require("async")
const mongodb = require("../mongodb");
const { UserBookingStatusTypes } = require("../config/config");

const fetchUserBookings = (req, callback)=>{
  let reqBody = req.body;
  if(reqBody && reqBody.userId){
    async.waterfall([
      function(triggerCallback){
        const criteria = {userId:reqBody.userId,status:UserBookingStatusTypes.ACTIVE};
        mongodb.userBookings.findByQuery(criteria,function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while fetching user bookings"
            })
          }
          else{
            triggerCallback(null,result);
          }
        })
      },
      function(userBookings,triggerCallback){
        let theatreAndMovieInfo = userBookings.reduce((accumulator, userBooking)=>{
          if(userBooking["theatreId"]){
            accumulator["theatreIds"][userBooking["theatreId"]] = 1;
          }
          if(userBooking["movieId"]){
            accumulator["movieIds"][userBooking["movieId"]] = 1;
          }
          return accumulator;
        },{"theatreIds":{},"movieIds":{}})
        theatreAndMovieInfo["theatreIds"] = Object.keys(theatreAndMovieInfo["theatreIds"])
        theatreAndMovieInfo["movieIds"] = Object.keys(theatreAndMovieInfo["movieIds"])
        mongodb.movies.findByQuery({movieId:{$in:theatreAndMovieInfo["movieIds"]}},{bigPoster:0,languageIDs:0},function(err,result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while feching movies info"
            })
          }
          else{
            let moviesObj = result.reduce((ac,movieInfo)=>{
              if(movieInfo["movieId"]){
                ac[movieInfo["movieId"]] = movieInfo;
                return ac;
              }
              else{
                return ac;
              }
            },{})
            triggerCallback(null,userBookings,moviesObj,theatreAndMovieInfo);
          }
        })
      },
      function(userBookings, moviesObj, accumulator, triggerCallback){
        mongodb.theatres.findByQuery({theatreId:{$in:accumulator["theatreIds"]}},{seatStructure:0},function(err,result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while feching movies info"
            })
          }
          else{
            let theatresObj = result.reduce((ac,theatreInfo)=>{
              if(theatreInfo["theatreId"]){
                ac[theatreInfo["theatreId"]] = theatreInfo;
                return ac;
              }
              else{
                return ac;
              }
            },{})
            triggerCallback(null,userBookings,moviesObj,theatresObj,accumulator);
          }
        })        
      },
      function(userBookings, moviesObj, theatresObj, accumulator, triggerCallback){
        console.log(moviesObj,theatresObj,userBookings)
        let result = userBookings.reduce((ac,userBooking)=>{
          if(userBooking["movieId"] && userBooking["theatreId"]){
            let tempUserBooking = JSON.parse(JSON.stringify(userBooking));
            tempUserBooking["movieInfo"] = moviesObj[userBooking["movieId"]] || {};
            tempUserBooking["theatreInfo"] = theatresObj[userBooking["theatreId"]] || {};
            console.log("booking",tempUserBooking);
            ac.push(tempUserBooking);
            return ac;
          }
          else{
            return ac;
          }
        },[]);
        triggerCallback(null, {
          status:"success",
          userBookings:result
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

exports.fetchUserBookings = fetchUserBookings;