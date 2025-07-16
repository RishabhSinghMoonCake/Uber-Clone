import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import userRouter from './routes/user.routes.js'
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//connect db
connectDB()

//Routes
app.use('/users' , userRouter)

app.get('/' , (req,res)=>{
  res.send('hello')
})

export default app