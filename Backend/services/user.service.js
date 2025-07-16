import userModel from "../models/user.model.js";

export default async function createUser({firstname,lastname,email,password})
{
  if(!firstname||!email||!password){
    throw new Error('All Fiels are required')
  }
  const user = userModel.create({
    fullname:{
      firstname,
      lastname
    },
    email,
    password
  })

  return user
}
