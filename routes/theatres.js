const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/add-theatre",function(req, res){
  utils.theatres.addTheatre(req, function(err, result){
    res.json(result);
  })
})

router.post("/fetch-theatres",function(req, res){
  utils.theatres.fetchTheatres(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;