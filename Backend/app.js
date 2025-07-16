import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//connect db
connectDB()

//Routes
app.use('/users' , userRouter)

app.get('/' , (req,res)=>{
  res.send('hello')
})

export default app