import React, { Component } from 'react'
import "./ProfileHeader.css"

import {ProfileButton} from '../../Components'
import ENSPY from '../../assets/Images/ENSPY.jpg'

export class ProfileHeader extends Component {
  render() {
    return (
      <div className="profileHeader-container">
        <div className='profileHeader-container-div'>
            <img src={ENSPY} alt="Logo ENSPY" className='profileHeader-container-div-img'/>
            <span className='profileHeader-container-div-span'>ECOLE NATIONALE SUPERIEURE POLYTECHNIQUE DE YAOUNDE</span>
        </div>
        <ProfileButton></ProfileButton>
      </div>
    )
  }
}

export default ProfileHeader