import React, { Component } from 'react'
import './LoginText.css'
import Logobar from "../../assets/Images/Logobar.svg"

export class LoginText extends Component {
  render() {
    return (
        <div className='loginText-container'>
            <div className="systemName1">
                <div className="systemName1-div">
                    <img src={Logobar} alt="" className="colorband-login"/>
                    <span className='loginLogoName'>SYSTEME DE RECONNAISSANCE VOCALE ET D’EMPREINTE DIGITALE POUR LE CONTROLE D’ACCES</span>
                </div>
            </div>
        </div>
)
  }
}

export default LoginText