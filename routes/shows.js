const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-show-theatres",function(req, res){
  utils.shows.fetchShowTheatres(req, function(err, result){
    res.json(result);
  })
})

const showInfo={
  "movieId": "671cd3ae20f8b6a609807332",
  "theatreId": "671cf5846125a8bd662223bf",
  "languageId": "671c9084d92f1dbcad27ac7e",
  "startsFrom": "2024-10-28",
  "endsOn": "2024-11-08",
  "showTime": "10:15",
  "ticketPrice": 200
}

router.post("/add-show",function(req, res){
  utils.shows.addShow(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;