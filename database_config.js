const mongoose = require("mongoose");

console.log("db_config");

const connectDb = ()=>{
  mongoose.connect(
    process.env.MONGODB_URI);
    
    const db = mongoose.connection;
    
    db.on('connected', () => {
      console.log('MongoDB connected');
    });
    
    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
      setTimeout(() => {
        mongoose.connect(
          process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }, 5000);
    });
    
    db.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
}

module.exports = connectDb