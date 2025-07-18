import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {Link, useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useState } from 'react';

const UserLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [userData, setuserData] = useState({})
  
  const submitHandler = (e) =>{
    e.preventDefault()
    setuserData({
      email,
      password:pass
    })
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
          <span to='/signup'>  Sign up</span>
        </p>
        <p>Forgot password? 
          <span to='/signup'>  Reset it</span>
        </p>

        <button className={`captainButt ${buttonClass.butt}`}onClick={()=>navigate('/captain-login')}>Login as Captain</button>

       
      </form>
    </div>
  )
}
export default UserLogin