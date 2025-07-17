import userModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

async function registerUser(req,res)
{
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors: errors.array()})
  }

  const {fullname,email,password} = req.body

  const isUserExists = await userModel.findOne({ email })
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await userModel.hashPassword(password)
  const user = await createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword
  })

  const token = user.generateAuthToken()
  res.status(201).json({token,user})
}

async function loginUser(req,res)
{
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.arrar()})
  }

  const {email,password} = req.body
  const user = await userModel.findOne({email}).select('+password') //by default the password will not be returned to user hence we need (select) to get password too
  if(!user)
  {
    return res.status(401).json({message:'User does not exist'})
  }
  const isMatch = await user.comparePassword(password,user.password)
  if(!isMatch)
  {
    return res.status(401).json({message:'Invalid email or password'})
  }

  const token = user.generateAuthToken()
  res.cookie('token',token)
  res.status(200).json({token,user})
}

async function getUserProfile(req,res)
{
  res.status(200).json(req.user)
}


async function logoutUser(req,res)
{
  
  const token = req.cookies.token || req.headers.authorization.split(' ')[1]
  res.clearCookie('token')
  await blacklistTokenModel.create({token})
  res.status(200).json({message:'Logged out Successfully'})
}


export {registerUser, loginUser, getUserProfile, logoutUser}