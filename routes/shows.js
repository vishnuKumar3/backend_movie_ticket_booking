const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-show-theatres",function(req, res){
  utils.shows.fetchShowTheatres(req, function(err, result){
    res.json(result);
  })
})

router.post("/fetch-show",function(req, res){
  utils.shows.fetchShow(req, function(err, result){
    res.json(result);
  })  
})

router.post("/add-show",function(req, res){
  utils.shows.addShow(req, function(err, result){
    res.json(result);
  })
})

router.post("/book-tickets",function(req, res){
  utils.shows.bookTickets(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;