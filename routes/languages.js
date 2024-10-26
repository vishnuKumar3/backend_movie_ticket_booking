const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-languages",function(req, res){
  utils.languages.fetchLanguages(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;