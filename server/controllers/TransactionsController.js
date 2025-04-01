import TransactionsModel from "../model/TransactionsModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

// Utility function to fetch user and update budget
const fetchUserAndUpdateBudget = async (userId, cashflow, amount) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  let newBudget = user.budget;

  if (cashflow.toLowerCase() === "expense") {
    if (user.budget < amount) throw new Error("Insufficient budget");
    newBudget -= amount;
  } else if (cashflow.toLowerCase() === "income") {
    newBudget = Number(newBudget) + Number(amount);
  }

  user.budget = newBudget;
  await user.save();

  return user;
};

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
      throw new Error("All fields are required");
    }

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
      const user = await fetchUserAndUpdateBudget(userId, cashflow, amount);

      // If the transaction is saved successfully
      return res.status(200).json({
        success: "Transaction saved into database",
        transaction: result,
        newBudget: user.budget,
      });
    }
  } catch (error) {
    console.error("Error creating transaction:", error); // Logs error for debugging
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
      const user = await fetchUserAndUpdateBudget(userId, cashflow, amount);
      return res
        .status(200)
        .json({ updatedTransaction: transEdited, newBudget: user.budget });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const fetchTransactionsAndUpdateBudget = async (transIds) => {
  // Find transactions before deleting to adjust the budget
  const transactionsToDelete = await TransactionsModel.find({
    _id: { $in: transIds },
  });

  if (!transactionsToDelete.length) {
    throw new Error("No transactions found to delete");
  }
  // Get the user ID from one of the transactions
  const userId = transactionsToDelete[0].userId;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Adjust the user's budget
  let updatedBudget = user.budget;
  transactionsToDelete.forEach((transaction) => {
    if (transaction.cashflow.toLowerCase() === "income") {
      updatedBudget = Number(updatedBudget) - Number(transaction.amount); // Remove income
    } else if (transaction.cashflow.toLowerCase() === "expense") {
      updatedBudget = Number(updatedBudget) + Number(transaction.amount); // Refund expense
    }
  });

  // Update the budget in the database
  user.budget = updatedBudget;
  await user.save();
  return user;
};

const deleteTransactions = async (req, res) => {
  const transIds = req.body.ids.map((id) =>
    mongoose.Types.ObjectId.createFromHexString(id)
  );

  const user = await fetchTransactionsAndUpdateBudget(transIds);
  const trans = await TransactionsModel.deleteMany({ _id: { $in: transIds } });

  if (trans.deletedCount > 0) {
    return res
      .status(200)
      .json({ success: "Transactions deleted", newBudget: user.budget });
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
