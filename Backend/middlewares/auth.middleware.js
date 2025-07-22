import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import blacklistTokenModel from "../models/blacklistToken.model.js";

export default async function authUser(req,res,next)
{
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if(!token)
  {
    return res.status(401).json({message:'You are not authorized - no token found'})
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if(isBlacklisted)
  {
    return res.status(401).json({message:'You are not Authorized - blacklisted'})
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id)
    if (!user) {
      return res.status(401).json({message:'You are not authorized - user not found'})
    }
    req.user = user
    return next()
  }
  catch(err)
  {
    return res.status(401).json({message:'You are not authorized - error'})
  }
}

export async function authCaptain(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'You are not authorized - no token found' });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: 'You are not Authorized - blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'You are not authorized - captain not found' });
    }
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'You are not authorized - error' });
  }
}