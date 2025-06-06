import TransactionsModel from "../model/TransactionsModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

// Utility function to fetch user and update budget
const fetchUserAndUpdateBudget = async (
  userId,
  cashflow,
  amount,
  currentAmount = 0
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  let newBudget = Number(user.budget);
  let diff = Number(amount) - Number(currentAmount);

  if (cashflow.toLowerCase() === "expense") {
    //if (user.budget < amount) throw new Error("Insufficient budget");
    if (diff > 0) {
      newBudget -= diff;
    } else {
      newBudget += Math.abs(diff);
    }
  } else if (cashflow.toLowerCase() === "income") {
    if (diff > 0) {
      newBudget += diff;
    } else {
      newBudget -= Math.abs(diff);
    }
  }

  user.budget = newBudget;
  await user.save();

  return user;
};

const createTransaction = async (req, res) => {
  //console.log(req);
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

    if (!userId || !category || !date || !amount || !cashflow) {
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

    const user = await fetchUserAndUpdateBudget(userId, cashflow, amount);

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
    console.error("Error creating transaction:", error); // Logs error for debugging
    return res.status(500).json({ error: error.message });
  }
};

//for plaid api fetch
const createMultipleTransactions = async (req, res) => {
  const multipleTransactions = req.body.transactions;
  const userId = await User.findOne({ email: req.body.email }, { _id: 1 });
  const userIdString = userId._id.toString();

  multipleTransactions.forEach((transaction) => {
    transaction.userId = userIdString;
  });

  try {
    const newMultipleTransactions = await TransactionsModel.insertMany(
      multipleTransactions
    );
    return res.json({
      message: "Transactions created successfully",
    });
  } catch (error) {
    //console.error("Error creating multiple transactions:", error);
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

    if (!userId || !category || !date || !amount || !cashflow || !_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingTransaction = await TransactionsModel.findById(_id);

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    // 2. Access current amount
    const currentAmount = existingTransaction.amount;

    // Update fields directly on the document
    existingTransaction.userId = userId;
    existingTransaction.category = category;
    existingTransaction.date = date;
    existingTransaction.paymentMode = paymentMode;
    existingTransaction.description = description;
    existingTransaction.amount = amount;
    existingTransaction.cashflow = cashflow;
    existingTransaction.time = time;

    // Save updated transaction
    const updatedTransaction = await existingTransaction.save();

    if (updatedTransaction) {
      const user = await fetchUserAndUpdateBudget(
        userId,
        cashflow,
        amount,
        currentAmount
      );
      return res.status(200).json({
        updatedTransaction: updatedTransaction,
        newBudget: user.budget,
      });
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
  createMultipleTransactions,
  getTransactionsById,
  getTransactionById,
  editTransaction,
  deleteTransactions,
};
