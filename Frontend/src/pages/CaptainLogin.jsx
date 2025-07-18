import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useState } from 'react';

const CaptainLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [captainData, setCaptainData] = useState({})
  
  const submitHandler = (e) =>{
    e.preventDefault()
    setCaptainData({
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

        


        <button className={buttonClass.butt}>Login as Captain</button>

        <p>Don't have an account? 
          <span onClick={()=>navigate('/Captain-signup')}>  Register as Captain</span>
        </p>
        <p>Forgot password? 
          <span onClick={()=>navigate('/Captain-signup')}>  Reset it</span>
        </p>

        <button className={`captainButt ${buttonClass.butt}`}onClick={()=>navigate('/login')}>Login as User</button>

       
      </form>
    </div>
  )
}
export default CaptainLogin