import express from "express";
import {
  createLinkToken,
  exchangeToken,
  getTransactions,
} from "../controllers/PlaidController.js";

const router = express.Router();
router.post("/token", createLinkToken);
router.post("/exchange", exchangeToken);
router.get("/transactions", getTransactions);

export default router;
