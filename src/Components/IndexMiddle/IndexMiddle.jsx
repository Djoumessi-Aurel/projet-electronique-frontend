import React, { Component } from 'react'
import './IndexMiddle.css'
import Logobar from "../../assets/Images/Logobar.svg"
import Index2 from "../../assets/Images/Index2.jpg"
import { NavLink } from 'react-router-dom'

export class IndexMiddle extends Component {
  render() {
    return (
        <div className='indexMiddle-container'>
            <div className="systemName">
                <div className="systemName-div">
                    <img src={Logobar} alt="" className="colorband"/>
                    <span className='indexlLogoName'>SYSTEME DE RECONNAISSANCE VOCALE ET D’EMPREINTE DIGITALE POUR LE CONTROLE D’ACCES</span>
                </div>
                <NavLink className='indexLoginButton' to="/login" end>
                    Se Connecter
                </NavLink>
            </div>
            <img src={Index2} alt="" className="indexHeroImage" />
        </div>
    )
  }
}

export default IndexMiddle