const express = require("express");
const router = express.Router();
const TransactionsController = require("../controllers/TransactionsController.js");

router.post("/transaction/create", TransactionsController.createTransaction);
router.get(
  "/get/transactions/:authId",
  TransactionsController.getTransactionsById
);

module.exports = router;
