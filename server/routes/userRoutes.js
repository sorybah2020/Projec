import express from "express";
import {
  Login,
  Register,
  Logout,
  Update,
  getUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", Register);
router.post("/auth", Login);
router.post("/logout", Logout);
router.route("/profile").get(protect, getUser).put(protect, Update);

export default router;
