import React, { Component } from 'react'
import './LoginLogo.css'

import ENSPY from '../../assets/Images/ENSPY.jpg'

export class LoginLogo extends Component {
  render() {
    return (
        <div className='loginlogo-container'>
            <img src={ENSPY} alt="" className="loginlogo-container-img" />
            <span className="loginlogo-container-span">ECOLE NATIONALE SUPERIEURE POLYTECHNIQUE DE YAOUNDE</span>
        </div>
    )
  }
}

export default LoginLogo