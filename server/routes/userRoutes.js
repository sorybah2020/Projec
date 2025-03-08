import express from "express";
import {
  User,
  Register,
  Logout,
  Update,
  getUser,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/", Register);
router.post("/auth", User);
router.post("/logout", Logout);
router.route("/profile").get(getUser).put(Update);

export default router;
