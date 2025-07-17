import mongoose, { trusted } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const captainSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3,'Firstname must be atleast 3 characters or longer']
    },
    lastname:{
      type:String,
      minlength:[3,'Lastname must be atleast 3 characters or longer']
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    unique:true,
  },
  socketId:{
    type:String,
  },
  status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive'
  },
  vehicle:{
    color:{
      type:String,
      required:true,
      minlength:[3,'Color must be atleast 3 characters or longer']
    },
    plate:{
      type:String,
      required:true,
      unique:true,
      minlength:[3,'Plate must be atleast 3 characters or longer']
    },
    capacity:{
      type:Number,
      required:true,
      min:[1,'Capacity must be atleast 1 or more']
    },
    vehicleType:{
      type:String,
      required:true,
      enum:['car','motorcycle','auto'],
      default:'car'
    },
  },
  location:{
    lat:{
      type:Number,
    },
    lng:{
      type:Number,
    }
  }

})

captainSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}

captainSchema.methods.comparePassword = async function(password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

captainSchema.statics.hashPassword = async function(password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  this.password = hashedPassword
  return hashedPassword
}

const captainModel = mongoose.models.Captain || mongoose.model('Captain', captainSchema)

export default captainModel