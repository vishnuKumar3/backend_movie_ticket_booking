const express = require("express")
const router = express.Router();
const utils = require("../utils")
const jwt = require("jsonwebtoken");

router.use(function(req, res, next){
  let headers = req.headers;
  let userId = ""
  if(headers && headers.authorization){
      let tokenParts = headers.authorization.split(" ");
      if(Array.isArray(tokenParts) && tokenParts.length>=2){
          let accessToken = tokenParts[1];
          jwt.verify(accessToken,process.env.SECRET_KEY,function(err, result){
              if(err){
                  return res.json({
                      status:"error",
                      message:"Error occurred while processing the request",
                      error:err
                  })
              }
              else{
                  req.body["userId"] = result["userId"] || "";
                  next()
              }
          })
      }
      else{
          return res.json({
              status:"error",
              message:"Error occurred while processing the request",
          })            
      }
  }
  else{
      return res.json({
          status:"error",
          message:"Error occurred while processing the request",
      })        
  }
})

router.post("/fetch-user-bookings",function(req, res){
  utils.userBookings.fetchUserBookings(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;