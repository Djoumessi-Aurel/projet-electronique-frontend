import React, { Component } from 'react'
import './IndexLogo.css'

import ENSPY from '../../assets/Images/ENSPY.jpg'

export class IndexLogo extends Component {
  render() {
    return (
      <div className='indexlogo-container'>
        <img src={ENSPY} alt="" className="indexlogo-container-img" />
        <span className="indexlogo-container-span">ECOLE NATIONALE SUPERIEURE POLYTECHNIQUE DE YAOUNDE</span>
      </div>
    )
  }
}

export default IndexLogo