import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// router object
const router = express.Router();

// routing
// REGISTER|| methods post
router.post("/register", registerController);

router.post("login", loginController);

export default router;
