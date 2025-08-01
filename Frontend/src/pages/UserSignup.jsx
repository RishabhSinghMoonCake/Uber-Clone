import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {Link, useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useContext, useState } from 'react';
import { UserDataContext } from '../context/userContext.jsx';
import axios from 'axios'

const UserSignup = () => {
  const navigate = useNavigate()

  const [firstname,setFirstname] = useState('')
  const [lastname, setLastname ] = useState('')
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const {baseUrl,user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e) =>{
    e.preventDefault()
    const newUser = {
      fullname:{
        firstname,
        lastname,
      },      
      email,
      password:pass
    }
    

    try {
      const response = await axios.post(`${baseUrl}/users/register`, newUser)

      if(response.status === 201)
      {
        const data = response.data

        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
    

    setEmail('')
    setPass('')
    setFirstname('')
    setLastname('')
  }

  return (
    <div className="user-login">
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form className='user-login-form' onSubmit={submitHandler}>
        <h3>What's your email?</h3>
        <div className='name-input'>
          
          <input value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}
          className={`${inputClass.inp}`} 
          type="text" 
          required 
          placeholder="First"/>

          <input value={lastname}
          onChange={(e)=>setLastname(e.target.value)}
          className={`${inputClass.inp}`} 
          type="text" 
          placeholder="Last"/>
        </div>
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

        


        <button className={buttonClass.butt}>Sign Up as User</button>

        <p>Already have an account? 
          <span onClick={()=>navigate('/login')}>  Login</span>
        </p>

        <button className={`captainButt ${buttonClass.butt}`}onClick={()=>navigate('/captain-signup')}>Sign Up as Captain</button>
        <p className='bottom-perm'>By proceeding, you agree to our Terms of Service and Privacy Policy and consent to the collection and use of your data in accordance with our Privacy Policy and to get calls and messages from Uber and its service providers.</p>

      </form>
    </div>
  )
}
export default UserSignup