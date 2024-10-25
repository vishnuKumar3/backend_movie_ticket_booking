const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-show-theatres",function(req, res){
  utils.shows.fetchShowTheatres(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;