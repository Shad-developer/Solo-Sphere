const mongoose = require("mongoose");
var colors = require("colors");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully".bgGreen.white);
  } catch (error) {
    console.log(`Failed to connect ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
