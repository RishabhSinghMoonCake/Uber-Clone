import '../css/Home.css'
import tmap from '../assets/tmap.jpg'

import { useState } from 'react'
import FloaterTripLocation from './components/FloaterTripLocation'
import FloaterDriverOptions from './components/FloaterDriverOptions'
import FloaterConfirmRide from './components/FloaterConfirmRide'
import FloaterWaitingForDriver from './components/FloaterWaitingForDriver'
import FloatingRiderDetails from './components/FloatingRiderDetails'

const Home = () => {  
  const [tripLocData, setTripLocData] = useState(null)
  const [rideDetails, setRideDetails] = useState(null)
  const [waiting, setWaiting] = useState(false)
  const [driverFound, setDriverFound] = useState(false)

  return (
    <div className="home-container">
      <div>
        
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      </div>
      <div>
        <img className='tmap' src={tmap} alt="" />
      </div>
      {
        driverFound ? (
          <FloatingRiderDetails rideDetails={rideDetails} setRideDetails={setRideDetails}/>
        ) : waiting ? (
          <FloaterWaitingForDriver setWaiting={setWaiting} setDriverFound={setDriverFound}/>
        ) : rideDetails ? (
          <FloaterConfirmRide rideDetails={rideDetails} setRideDetails={setRideDetails} setWaiting={setWaiting}
          />
        ) : tripLocData ? (
          <FloaterDriverOptions setRideDetails={setRideDetails} setTripLocData={setTripLocData} />
        ) : (
          <FloaterTripLocation setTripLocData={setTripLocData} />
        )
      }
      
      
      

    </div>
  )
}
export default Home