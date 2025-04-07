import express from "express";
import {
  createLinkToken,
  exchangeToken,
} from "../controllers/PlaidController.js";

const router = express.Router();
router.post("/token", createLinkToken);
router.post("/exchange", exchangeToken);

export default router;
