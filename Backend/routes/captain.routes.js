import express from "express";
import {body} from "express-validator";
import { registerCaptain , loginCaptain, logoutCaptain, getCaptainProfile} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", [
  body("fullname.firstname").notEmpty().withMessage("Firstname is required"),
  body("fullname.lastname").notEmpty().withMessage("Lastname is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
  body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
  body("vehicle.capacity").isNumeric().withMessage("Vehicle capacity must be a number"),
  body("vehicle.vehicleType").notEmpty().withMessage("Vehicle type is required"),
], registerCaptain);


router.post('/login', [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
] , loginCaptain);

router.get('/logout', authCaptain,logoutCaptain);
router.get('/profile', authCaptain, getCaptainProfile);

export default router;