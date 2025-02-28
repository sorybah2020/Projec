const TransactionsModel = require("../models/TransactionsModel.js");
const connectDB = require("../config/mongodb.js");

const createTransaction = async (req, res) => {
  try {
    await connectDB();

    const { category, date, paymentMode, description, amount, cashflow, time } =
      req.body;
    console.log({
      category,
      date,
      paymentMode,
      description,
      amount,
      cashflow,
      time,
    });
    if (
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

module.exports = {
  createTransaction,
};
