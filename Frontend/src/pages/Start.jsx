import '../css/Start.css'
import bgImg from '../assets/bg.jpg'
import { useNavigate } from 'react-router';
import buttonClass from '../css/modules/button.module.css'
const Start = () => {
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate('/login');
  }

  return (
    <div className='start-container'>
      <div className='background'>
        <img className='bg-image' src={bgImg} alt="" />
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        
      </div>
      <div className='footer-nav'>
        <h2>Get Started with Uber</h2>
        <button className={buttonClass.butt} onClick={handleProceed}>Continue</button>
      </div>
    </div>
  )
}
export default Start