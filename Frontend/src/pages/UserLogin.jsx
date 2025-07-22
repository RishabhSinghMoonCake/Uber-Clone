import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {Link, useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useState,useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';
const UserLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const {baseUrl,user, setUser} = useContext(UserDataContext)
  
  const submitHandler = async (e) =>{
    e.preventDefault()

    const user = {
      email,
      password:pass
    }
    try {
      const response = await axios.post(`${baseUrl}/users/login`, user)

      if(response.status === 200)
      {
        const data = response.data

        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
      else
      {
        //login failed pop up
      }
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    setPass('')
  }

  return (
    <div className="user-login">
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form className='user-login-form' onSubmit={submitHandler}>
        <h3>What's your email?</h3>
        <input value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className={inputClass.inp}  
        type="email" 
        required 
        placeholder="email@example.com"/>
        <h3>Enter Password</h3>
        <input value={pass}
        onChange={(e)=>setPass(e.target.value)}
        className={inputClass.inp} 
        type="password" 
        required 
        placeholder="password" />

        


        <button className={buttonClass.butt}>Login as User</button>

        <p>Don't have an account? 
          <span onClick={()=>navigate('/signup')}>  Sign up</span>
        </p>
        <p>Forgot password? 
          <span onClick={()=>navigate('/signup')}>  Reset it</span>
        </p>

        <button className={`captainButt ${buttonClass.butt}`}onClick={()=>navigate('/captain-login')}>Login as Captain</button>

       
      </form>
    </div>
  )
}
export default UserLogin