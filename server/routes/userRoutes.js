import express from "express";
import asyncHandler from "express-async-handler";

import {
  Login,
  Register,
  Logout,
  Update,
  getUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", Register);
router.post("/auth", Login);
router.post("/logout", Logout);
// router.route("/profile").get(protect, getUser).put(protect, Update);
router.route("/profile").get(getUser).put(Update);
router.get(
  "/profile",
  //protect,
  asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware
    // Exclude sensitive information like password
    const { _id, name, email } = req.user;

    res.status(200).json({
      _id,
      name,
      email,
    });
  })
);
export default router;
