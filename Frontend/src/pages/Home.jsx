import '../css/Home.css'
import tmap from '../assets/tmap.jpg'

import { useState } from 'react'
import FloaterTripLocation from './components/FloaterTripLocation'
import FloaterDriverOptions from './components/FloaterDriverOptions'

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
      <FloaterTripLocation isPanelOpen={isPanelOpen} setPanelOpen={setPanelOpen} />
      <FloaterDriverOptions isPanelOpen={isPanelOpen} setPanelOpen={setPanelOpen} />

    </div>
  )
}
export default Home