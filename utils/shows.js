const async = require("async");

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

exports.fetchShowTheatres = fetchShowTheatres;