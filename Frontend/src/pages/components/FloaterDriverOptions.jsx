import '../../css/Home.css';
import leftArrow from '../../assets/left-arrow.png'

const FloaterDriverOptions = ({ isPanelOpen, setPanelOpen }) => {
  return (
    <div className="home-container driver-options">
      <div className='floater-container panel-close'  onClick={(e) => {e.stopPropagation(); if(!isPanelOpen)setPanelOpen(true)}}>
        <div className='floater-inside'>
          <div className='floater-header'>
            <button onClick={(e) => {e.stopPropagation(); setPanelOpen(false)}} className="back-button">
              <img src={leftArrow}/>
            </button>
            
            <h2 className='floater-title'>Select your Captain</h2>
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
export default FloaterDriverOptions