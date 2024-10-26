const express = require("express");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage()
const cors = require("cors")
require("dotenv").config()
const userRouter = require("./routes/user")
const connectDb = require("./database_config");
const moviesRouter = require("./routes/movies");
const showsRouter = require("./routes/shows");
const languagesRouter = require("./routes/languages")


app.use(express.json())
app.use(cors({origin:"*"}))
app.use(multer({storage:storage}).any())
app.use("/user",userRouter)
app.use("/movies",moviesRouter)
app.use("/shows",showsRouter);
app.use("/languages",languagesRouter);

app.listen(process.env.PORT, function(err){
  connectDb();
  console.log(`server listening on port ${process.env.PORT}`)
})