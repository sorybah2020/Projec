const TransactionsModel = require("../models/TransactionsModel.js");
const connectDB = require("../config/mongodb.js");
const mongoose = require("mongoose");
const createTransaction = async (req, res) => {
  try {
    const {
      userId,
      category,
      date,
      paymentMode,
      description,
      amount,
      cashflow,
      time,
    } = req.body;

    if (
      !userId ||
      !category ||
      !date ||
      !paymentMode ||
      !description ||
      !amount ||
      !cashflow ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transaction = new TransactionsModel({
      userId,
      category,
      date,
      paymentMode,
      description,
      amount,
      cashflow,
      time,
    });
    const result = await transaction.save();
    if (result._id) {
      return res
        .status(200)
        .json({ success: "Transaction saved into database" });
    }
  } catch (error) {}
};

const getTransactionsById = async (req, res) => {
  try {
    const userId = req.params.authId;
    const transactions = await TransactionsModel.find({ userId: userId });
    if (transactions.length > 0) {
      return res.status(200).json(transactions);
    }
  } catch (error) {}
};
module.exports = {
  createTransaction,
  getTransactionsById,
};
