const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected ..");
  } catch (err) {
    console.log(`can not connect!!! ${err}`);
  }
};
module.exports = connectDB;
