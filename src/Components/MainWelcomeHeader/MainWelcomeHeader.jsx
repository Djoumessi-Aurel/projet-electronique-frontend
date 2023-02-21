import React, { Component } from 'react'
import './MainWelcomeHeader.css'

import WelcomeWoman from '../../assets/Images/BienvenuWomanSVG.svg'
import WelcomeEffect from '../../assets/Images/BienvenuEffectSVG.svg'

const MainWelcomeHeader = () => {
   const user =JSON.parse(localStorage.getItem('user'))
    return (
      <div className="mainWelcomeHeader-container">
        <img src={WelcomeWoman} alt="" className="mainWelcomeHeader-container-img1"/>
        <div className="mainWelcomeHeader-container-div">
        <img src={WelcomeEffect} alt="" className="mainWelcomeHeader-container-div-img2"/>
          <div className="mainWelcomeHeader-container-div-div">
            <span className="">Salut, {user.nom}</span>
            <span className="">Bienvenue sur la Plateforme d’administration du contrôle d’accès</span>
            <span className="">Vous pourrez vérifier les enrôlement et superviser les présences des étudiants</span>
          </div>
        </div>
      </div>
    )
  
}

export default MainWelcomeHeader