const async = require("async");

const fetchMovies = (req, callback)=>{
  let reqBody = req.body;
  const response = {
    status:'success',
    movies:[{
    name:"The GOAT",
    releasedYear:2024,
    duration:150,
    rating:7.9,
    language:"Telugu",
    releaseDate:"12th Jan 2024",
    description:"Consequences of an unknown past haunt the present of a special anti-terrorist squad. How will they confront it?"
  }]};

  async.waterfall([
    function(triggerCallback){
      triggerCallback(null,response)
    }
  ],
  function(err, result){
    callback(err, result);
  })  
}

exports.fetchMovies = fetchMovies;