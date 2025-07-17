import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3,'First name must be at least 3 characters or longer']
    },
    lastname:{
      type:String,
      minlength:[3,'Last name must be at least 3 characters or longer']
    }
  },
  email:{
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long']
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  socketId:{
    type: String
  }
})

const SALT = 10

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn:'24h'});
  return token;
}

userSchema.methods.comparePassword = async (password, hashPassword)=>{
  return await bcrypt.compare(password, hashPassword)
}

userSchema.statics.hashPassword = async (password)=>{
  const hashedPassword = await bcrypt.hash(password, SALT)
  return hashedPassword
}

const userModel = mongoose.models.user || mongoose.model('user' , userSchema)

export default userModel