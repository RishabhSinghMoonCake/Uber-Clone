import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useState,useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';
const CaptainLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const {captain,setCaptain,baseUrl} = useContext(CaptainDataContext)
  const submitHandler = async (e) =>{
    e.preventDefault()
    const user = {
      email,
      password:pass
    }
    try {
      const response = await axios.post(baseUrl + '/captains/login', user)
      if(response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        console.log("Captain logged in successfully:", data);
        navigate('/home');
      }
      else if(response.status === 400)
      {
        console.error("Login failed with status:", response.errors);
      }
      else
      {
        console.error("Unexpected response status:", response.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
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