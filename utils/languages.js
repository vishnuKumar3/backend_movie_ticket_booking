const async = require("async");
const mongodb = require("../mongodb");

const fetchLanguages = (req, callback)=>{
  let reqBody = req.body;

  async.waterfall([
    function(triggerCallback){
      mongodb.languages.findByQuery({},function(err, result){
        if(err){
          triggerCallback(true,{
            status:"error",
            message:"Error occurred while fetching languages list"
          })
        }
        else{
          triggerCallback(null, {
            status:"success",
            languages:result
          })
        }
      })
    }
  ],
  function(err, result){
    callback(err, result);
  })  
}

exports.fetchLanguages = fetchLanguages;