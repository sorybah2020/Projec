import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import plaidRoutes from "./routes/plaidRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsRouter from "./routes/Transactions.js";

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL (React)
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api", TransactionsRouter);
app.use("/api/plaid", plaidRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
