const express = require("express");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage()
const cors = require("cors")
require("dotenv").config()
const userRouter = require("./routes/user")
const connectDb = require("./database_config");

app.use(express.json())
app.use(cors({origin:["*"]}))
app.use(multer({storage:storage}).any())
app.use("/user",userRouter)

app.listen(8080, function(err){
  connectDb();
  console.log(`server listening on port ${process.env.PORT}`)
})