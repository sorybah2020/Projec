const express = require("express");
require("dotenv").config();
const connectDB = require("./config/mongodb");
const port = process.env.PORT || 3000;

connectDB();

const app = express();


app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
