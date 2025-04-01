import TransactionsModel from "../model/TransactionsModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

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

    const user = await User.findById(userId);
    if (!user) {
      // If the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    let newBudget = user.budget;

    if (cashflow.toLowerCase() === "expense") {
      // If the transaction is an expense
      if (user.budget < amount) {
        return res.status(400).json({ error: "Insufficient budget" });
      }
      newBudget -= amount;
    } else if (cashflow.toLowerCase() === "income") {
      // If the transaction is an income
      newBudget += amount;
    }

    // Update the user's budget
    user.budget = newBudget;
    await user.save();

    const transaction = new TransactionsModel({
      // Create a new transaction
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
      // If the transaction is saved successfully
      return res.status(200).json({
        success: "Transaction saved into database",
        transaction: result,
        newBudget: user.budget,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTransactionsById = async (req, res) => {
  try {
    const userId = req.params.authId;
    const transactions = await TransactionsModel.find({ userId: userId });
    if (transactions.length == 0) {
      return res.status(200).json({ message: "No transactions found" });
    }
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await TransactionsModel.find({ _id: transactionId });
    if (transaction.length > 0) {
      return res.status(200).json(transaction);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editTransaction = async (req, res) => {
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
      _id,
    } = req.body;

    if (
      !userId ||
      !category ||
      !date ||
      !paymentMode ||
      !description ||
      !amount ||
      !cashflow ||
      !time ||
      !_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transEdited = await TransactionsModel.findOneAndUpdate(
      { _id: _id },
      {
        userId: userId,
        category: category,
        date: date,
        paymentMode: paymentMode,
        description: description,
        amount: amount,
        cashflow: cashflow,
        time: time,
      },
      { new: true }
    );
    if (transEdited) {
      return res.status(200).json({ updatedTransaction: transEdited });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTransactions = async (req, res) => {
  const transIds = req.body.ids.map((id) =>
    mongoose.Types.ObjectId.createFromHexString(id)
  );

  const trans = await TransactionsModel.deleteMany({ _id: { $in: transIds } });

  if (trans.deletedCount > 0) {
    return res.status(200).json({ success: "Transactions deleted" });
  } else {
    return res.status(404).json({ error: "No transactions found to delete" });
  }
};

export default {
  createTransaction,
  getTransactionsById,
  getTransactionById,
  editTransaction,
  deleteTransactions,
};
