import express from "express";
import { createLinkToken, plaidTest } from "../controllers/PlaidController.js";

const router = express.Router();
router.post("/token", createLinkToken);
router.get("/test", plaidTest);

export default router;
