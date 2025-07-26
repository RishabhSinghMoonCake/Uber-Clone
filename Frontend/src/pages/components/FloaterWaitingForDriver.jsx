import '../../css/Home.css';
import leftArrow from '../../assets/left-arrow.png';
import { useEffect, useRef, useState } from 'react';

const FloaterWaitingForDriver = ({setWaiting,setDriverFound}) => {
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
  useEffect(()=>{
    setDriverFound(true)
    setWaiting(false)
  },[])
  

  return (
    <div className="home-container waiting">
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

            <h2 className='floater-title'>Waiting For Driver</h2>
          </div>
          <img style={{width:'300px',marginLeft:'50%', translate:'-50% 0'}} src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          
        </div>
      </div>
    </div>
  );
};

export default FloaterWaitingForDriver;
