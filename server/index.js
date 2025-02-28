const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const TransactionsRouter = require("./routes/Transactions.js");

require("dotenv").config();
const connectDB = require("./config/mongodb");
const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL (React)
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/api", TransactionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
