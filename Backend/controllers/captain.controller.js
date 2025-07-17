import blacklistTokenModel from "../models/blacklistToken.model.js";
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


async function loginCaptain(req, res) {
  const errors = validationResult(req); // Validate request body
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const { email, password } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });
  if(!isCaptainExists) {
    return res.status(400).json({ message: "Email is not registered" });
  }

  const isMatch = await isCaptainExists.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = isCaptainExists.generateAuthToken(); // Generate auth token for the captain
  res.cookie('token', token); // Set the token in a cookie
  // res.header('Authorization', `Bearer ${token}`);
  res.status(200).json({ captain: isCaptainExists, token });
}

async function logoutCaptain(req, res) {
  
  const token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Get the token from cookies
  res.clearCookie('token'); // Clear the cookie
  await blacklistTokenModel.create({
    token // Store the token in blacklist
  });

  res.status(200).json({ message: "Logged out successfully" });
}

async function getCaptainProfile(req, res) {
  const captain = req.captain; // Get the captain from the request object
  res.status(200).json({ captain });
}

export { registerCaptain , loginCaptain , logoutCaptain, getCaptainProfile }