import buttonClass from '../css/modules/button.module.css';
import '../css/login.css';
import {Link, useNavigate} from 'react-router';
import inputClass from '../css/modules/input.module.css';
import { useContext, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [firstname,setFirstname] = useState('')
  const [lastname, setLastname ] = useState('')
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  
  const {captain,setCaptain,baseUrl} = useContext(CaptainDataContext)

  const [vehicleColor, setVehicleColor] = useState("")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const submitHandler = async (e) =>{
    e.preventDefault()
    const captainData = {
      fullname:{
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: pass,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(baseUrl + '/captains/register', captainData);
      if(response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        console.log("Captain registered successfully:", data);
        navigate('/home');
      }
      else if(response.status === 400)
      {
        console.error("Signup failed with status:", response.errors);
      }
      else
      {
        console.error("Unexpected response status:", response.message);
      }
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }

    setEmail('')
    setPass('')
    setFirstname('')
    setLastname('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
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
        
        <div className="vehicle-details input-grid">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className={inputClass.inp}
            required
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Other">Other</option>
          </select>
          <input
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className={inputClass.inp}
            type="text"
            required
            placeholder="Vehicle Color"
          />
          <input
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className={inputClass.inp}
            type="text"
            required
            placeholder="Vehicle Plate Number"
          />
          <input
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className={inputClass.inp}
            type="number"
            min="1"
            required
            placeholder="Vehicle Capacity"
          />
        </div>
        


        <button className={buttonClass.butt}>Sign Up as Captain</button>
        <p>Already have an account? 
          <span onClick={()=>navigate('/captain-login')}>  Login</span>
        </p>
        
        <p className='bottom-perm'>By proceeding, you agree to our Terms of Service and Privacy Policy and consent to the collection and use of your data in accordance with our Privacy Policy and to get calls and messages from Uber and its service providers.</p>
        <button className={`captainButt ${buttonClass.butt}`}onClick={()=>navigate('/signup')}>Sign Up as User</button>
      </form>
    </div>
  )
}
export default CaptainSignup