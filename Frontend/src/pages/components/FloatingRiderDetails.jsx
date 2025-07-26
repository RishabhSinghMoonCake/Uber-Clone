import '../../css/Home.css';
import leftArrow from '../../assets/left-arrow.png';
import { useRef, useState } from 'react';

const FloatingRiderDetails = ({rideDetails, setRideDetails,setWaiting}) => {
  const floaterContainer = useRef(null);
  const backButton = useRef(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [pickUpLoc,setPickUpLoc] = useState("")
  const [destLoc, setDestLoc] = useState("")

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

  function submitHandler()
  {
    
  }

  return (
    <div className="home-container ride-details">
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

            <h2 className='floater-title'>Ride Details</h2>
          </div>

          <div className='ride-details'>
            <img style={{width:'300px'}} src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className="loc-details">
              <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/marker--v1.png" alt="marker--v1"/>
              <div className='loc-details-info'>
                <h2>562/11-A</h2>
                <p>Kankariya Talab, Bhopal</p>
              </div>
            </div>

            <div className="loc-details">
              <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/marker--v1.png" alt="marker--v1"/>
              <div className='loc-details-info'>
                <h2>562/11-A</h2>
                <p>Kankariya Talab, Bhopal</p>
              </div>
            </div>

            <div className="loc-details">
              
              <img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/cash--v2.png" alt="cash--v2"/>
              <div className='loc-details-info'>
                <h2>₹193.20</h2>
                <p>Cash</p>
              </div>
            </div>

          </div>
          <button onClick={()=>submitHandler()} className='floater-button'>Confirm Ride</button>
        </div>
      </div>
    </div>
  );
};

export default FloatingRiderDetails;
