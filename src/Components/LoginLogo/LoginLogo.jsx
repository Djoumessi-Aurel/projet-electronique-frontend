import React, { Component } from 'react'
import './LoginLogo.css'

import ENSPY from '../../assets/Images/ENSPY.jpg'
import { useNavigate } from 'react-router-dom'

const LoginLogo= () => {

  const navigate = useNavigate()

    return (
        <div className='loginlogo-container' onClick={() => navigate('/')} style={{cursor: 'pointer'}} title="Aller à l'accueil">
            <img src={ENSPY} alt="" className="loginlogo-container-img" />
            <span className="loginlogo-container-span">ECOLE NATIONALE SUPERIEURE POLYTECHNIQUE DE YAOUNDE</span>
        </div>
    )
}

export default LoginLogo