const express = require("express");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage()
const cors = require("cors")
require("dotenv").config()
const userRouter = require("../routes/user")
const connectDb = require("../database_config");
const moviesRouter = require("../routes/movies");
const showsRouter = require("../routes/shows");
const languagesRouter = require("../routes/languages")
const theatresRouter = require("../routes/theatres")
const userBookingsRouter = require("../routes/userBookings");


app.use(express.json())
app.use(cors({origin:["https://motick.netlify.app"]}))
app.use(multer({storage:storage}).any())
app.use("/user",userRouter)
app.use("/movies",moviesRouter)
app.use("/shows",showsRouter);
app.use("/languages",languagesRouter);
app.use("/theatres",theatresRouter);
app.use("/userBookings",userBookingsRouter);

app.get("/",function(req, res){
  setInterval(()=>{
    connectDb();
  },50000)
  res.json({
    status:"success"
  })
})

app.listen(process.env.PORT, function(err){
  connectDb();
  console.log(`server listening on port ${process.env.PORT}`)
})

module.exports = app;