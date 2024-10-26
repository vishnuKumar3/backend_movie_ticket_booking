const express = require("express")
const router = express.Router();
const utils = require("../utils")

router.post("/fetch-user-bookings",function(req, res){
  utils.userBookings.fetchUserBookings(req, function(err, result){
    res.json(result);
  })
})

module.exports = router;