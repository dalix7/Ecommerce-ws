const express = require("express");
const app = express();

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const Multer = require("multer");
const connectDB = require("./config/connectDB");
connectDB();

app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/product", require("./routes/product"));

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.err(err) : console.log(`server running on port ${PORT}`);
});
