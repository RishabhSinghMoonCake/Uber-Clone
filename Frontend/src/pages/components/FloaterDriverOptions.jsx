import '../../css/Home.css';
import leftArrow from '../../assets/left-arrow.png';
import { useRef, useState } from 'react';

const FloaterDriverOptions = ({setRideDetails,setTripLocData}) => {
  const floaterContainer = useRef(null);
  const backButton = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  function setPanelOpen(value) {
    setIsPanelOpen(value);
    const panel = floaterContainer.current;
    const backBtn = backButton.current;
    if (!panel || !backBtn) return;

    panel.classList.remove('panel-open', 'panel-close');
    void panel.offsetWidth; // force reflow
    panel.classList.add(value ? 'panel-open' : 'panel-close');
    backBtn.style.display = value ? 'inline' : 'none';
  }

  function handleResetLoc()
  {
    setTripLocData(null)
  }

  function handleSelectRide(e)
  {
    const name = e.currentTarget.getAttribute('name');
    if(name ==="uber-go")
    {
      setRideDetails({
        ride:'uber-go'
      })
    }
    else if(name === 'uber-moto')
    {
      setRideDetails({
        ride:'uber-moto'
      })
    }
    else if(name === 'uber-auto')
    {
      setRideDetails({
        ride:'uber-auto'
      })
    }
    else
    {
      setRideDetails(null)
    }
  }

  return (
    <div className="home-container driver-options-container">
      <div
        ref={floaterContainer}
        className='floater-container panel-close'
        onClick={(e) => {
          e.stopPropagation();
          if (!isPanelOpen) setPanelOpen(true);
        }}
      >
        <div className='floater-inside'>
          <div className='floater-header'>
            <button
              ref={backButton}
              onClick={(e) => {
                e.stopPropagation();
                setPanelOpen(false);
              }}
              className="back-button"
              aria-label="Go back"
            >
              <img src={leftArrow} alt="Back" />
            </button>

            <h2 className='floater-title'>Choose Your Ride</h2>
          </div>
          <div className="driver-types">
            <div onClick={e=>handleSelectRide(e)} name="uber-go" className="driver-type-tag">
              <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="UberGo" />
              <div className='driver-type-info'>
                <h2>UberGo</h2>
                <p>2 mins away | <span>15:24</span> </p>
                <p>Affordable, compact rides</p>
              </div>
              <p className='driver-type-price'>₹193.20</p>
            </div>
            <div onClick={e=>handleSelectRide(e)} name="uber-moto" className="driver-type-tag">
              <img style={{width:'100px'}} src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
              <div className='driver-type-info'>
                <h2>Moto</h2>
                <p>2 mins away | <span>15:24</span> </p>
                <p>Affordable, motorcycle rides</p>
              </div>
              <p className='driver-type-price'>₹193.20</p>
            </div>
            <div onClick={e=>handleSelectRide(e)} name="uber-auto" className="driver-type-tag">
              <img style={{width:'80px'}} src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="UberAuto" />
              <div className='driver-type-info'>
                <h2>UberAuto</h2>
                <p>2 mins away | <span>15:24</span> </p>
                <p>Affordable, tuk tuk rides</p>
              </div>
              <p className='driver-type-price'>₹193.20</p>
            </div>
          </div>
          
          <div className="backToTripLoc">
            <p>Not Right Location,<span style={{fontSize:'20px',fontWeight:'700',color:'blue'}} onClick={()=>handleResetLoc()}> Click Here</span> to go to Location Details?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloaterDriverOptions;
