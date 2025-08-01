import '../../css/Home.css';
import leftArrow from '../../assets/left-arrow.png';
import { useRef, useState } from 'react';

const FloaterTripLocation = ({setTripLocData}) => {
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
    if(!pickUpLoc || !destLoc) return;
    setTripLocData({
      pickUpLoc,
      destLoc
    })
  }

  return (
    <div className="home-container">
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

            <h2 className='floater-title'>Find a trip</h2>
          </div>

          <div className="link-inputs"></div>
          <input value={pickUpLoc} onChange={e=>setPickUpLoc(e.target.value)} type="text" placeholder='Add a pick up location' autoComplete="off" />
          <input value={destLoc} onChange={e=>setDestLoc(e.target.value)} type="text" placeholder='Add a drop off location' autoComplete="off" />
          <button onClick={()=>submitHandler()} className='floater-button'>Find your Captain</button>
        </div>

        <div className="floater-suggestions" />
      </div>
    </div>
  );
};

export default FloaterTripLocation;
