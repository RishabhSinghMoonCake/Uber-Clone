import '../css/Home.css'
import tmap from '../assets/tmap.jpg'
import leftArrow from '../assets/left-arrow.png'
import { useState } from 'react'

const Home = () => {
  const [isPanelOpen,setIsPanelOpen] = useState(false);

  function setPanelOpen(value) {
    setIsPanelOpen(value);
    const panel = document.querySelector('.floater-container');
    const backButton = document.querySelector('.back-button');
    // Remove both classes first
    panel.classList.remove('panel-open', 'panel-close');
    // Force reflow to restart animation
    void panel.offsetWidth;
    if (value) {
      panel.classList.add('panel-open');
      backButton.style.display = 'inline';
    } else {
      panel.classList.add('panel-close');
      backButton.style.display = 'none';
    }
  }

  return (
    <div className="home-container">
      <div>
        
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      </div>
      <div>
        <img className='tmap' src={tmap} alt="" />
      </div>
      <div className='floater-container panel-close'  onClick={(e) => {e.stopPropagation(); if(!isPanelOpen)setPanelOpen(true)}}>
        <div className='floater-inside'>
          <div className='floater-header'>
            <button onClick={(e) => {e.stopPropagation(); setPanelOpen(false)}} className="back-button">
              <img src={leftArrow}/>
            </button>
            
            <h2 className='floater-title'>Find a trip</h2>
          </div>
          <div className="link-inputs"></div>
          <input type="text" placeholder='   Add a pick up location' />
          <input type="text" placeholder='   Add a drop off location' />
          <button className='floater-button'>Find your Captain</button>
        </div>
        <div className="floater-suggestions">

        </div>
      </div>
    </div>
  )
}
export default Home