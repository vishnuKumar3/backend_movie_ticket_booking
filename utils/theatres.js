const {ObjectId} = require("mongodb")
const async = require("async")
const {addTimeStamps} = require("./commonFunctions")
const mongodb = require("../mongodb")

const formatSeatStructure = (seatStructure)=>{
  seatStructure.map((row)=>{
    if(row["totalSeats"]){
      let seats = [0];
      for(var i=1;i<=row["totalSeats"];i++){
        seats.push(1);
      }
      row["seats"]=seats;
    }
  })
  return seatStructure;
}

const addTheatre = (req, callback)=>{
  let reqbody = req.body;
  if(reqbody.theatreName && reqbody.seatingCapacity && reqbody.location && reqbody.seatStructure){
    async.waterfall([
      function(triggerCallback){
        let theatreId = new ObjectId();
        reqbody._id = theatreId;
        reqbody.theatreId = theatreId.toHexString();
        reqbody = addTimeStamps(reqbody);
        reqbody["seats"] = formatSeatStructure(reqbody["seatStructure"])
        mongodb.theatres.insertOne(reqbody,function(err, result){
          if(err){
            triggerCallback(true,{
              status:"error",
              message:"Error occurred while adding theatre"
            })
          }
          else{
            triggerCallback(null, {
              status:"success",
              message:"Successfully added the theater info the DB"
            })
          }
        })
      }
    ],
    function(err, result){
      callback(err, result)
    }
  )
  }
  else{
    callback(true,{
      status:"error",
      message:"Please provide valid details"
    })
  }
}

const fetchTheatres = (req, callback)=>{
  let reqBody = req.body;

  async.waterfall([
    function(triggerCallback){
      mongodb.theatres.findByQuery({},{seatStructure:0},function(err, result){
        if(err){
          triggerCallback(true, {
            status:"error",
            message:'Error occurred while fetching theatres list'
          })
        }
        else{
          triggerCallback(null, {
            status:"success",
            theatres:result
          })
        }
      })
    }
  ],
  function(err, result){
    callback(err, result);
  })    
}

exports.addTheatre = addTheatre
exports.fetchTheatres = fetchTheatres;