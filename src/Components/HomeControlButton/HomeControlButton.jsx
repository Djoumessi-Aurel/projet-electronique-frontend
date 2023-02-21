import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeControlButton.css'

const HomeControlButton = (props) => {

  const navigate = useNavigate()

  return (
    <div className='homeControlButton-container' style={props.bgColor}
    onClick={()=>navigate(props.navigateTo)} >
        <div className='homeControlButton-container-div'>
            <img src={props.icon} alt="" className="homeControlButton-container-div-img" />
            <span className='homeControlButton-container-div-span'><span>{props.registeredNumber}</span></span>
        </div>
        <span className="homeControlButton-container-span">{props.label}</span>
    </div>
)
}

export default HomeControlButton