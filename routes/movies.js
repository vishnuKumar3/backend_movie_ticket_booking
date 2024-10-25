const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-movies",function(req, res){
  utils.movies.fetchMovies(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;