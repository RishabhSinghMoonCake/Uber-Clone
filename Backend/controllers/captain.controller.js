import captainModel from "../models/captain.model.js";
import createCaptain from "../services/captain.service.js";
import { validationResult } from "express-validator";

async function registerCaptain(req, res) {

  const errors = validationResult(req); // Validate request body
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullname,email,password,vehicle } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password); // Hash the password before saving

  try {
    const newCaptain = await createCaptain({
      fullname,
      email,
      password: hashedPassword,
      vehicle
    });

    const token = newCaptain.generateAuthToken(); // Generate auth token for the captain
    
    res.status(201).json({ captain: newCaptain, token });
  } catch (error) {
    res.status(400).json({message: error.message });
  }
}

export { registerCaptain };