import React, { Component } from 'react'
import './LoginPage.css'

import Login1 from '../../assets/Images/Login1.jpg'
import Login2 from '../../assets/Images/Login2.jpg'
import {LoginLogo} from '../../Components'
import {LoginText} from '../../Components'
import {LoginForm} from '../../Components'
import Ellipse1 from '../../assets/Images/Ellipse1.svg'
import Ellipse2 from '../../assets/Images/Ellipse2.svg'
import Ellipse3 from '../../assets/Images/Ellipse3.svg'
import Ellipse4 from '../../assets/Images/Ellipse4.svg'
import Ellipse5 from '../../assets/Images/Ellipse5.svg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem("token")) {navigate("/accueil");}
    }, [])

    const login1Style = {
        backgroundImage: `url(${Login1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "50vh",
        borderRadius: "70px 0px 0px 0px",
    }

    const login2Style = {
        backgroundImage: `url(${Login2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "45vh",
        borderRadius: "0px 0px 0px 70px",
    }

    return (
      <div className="login-container">
        <div className="login-container-div">
            <div className="login-div1">
                <div className='loginStyle'>
                    <div style={login1Style}>
                        <div className="login1-div1">
                            <LoginLogo/>
                            
                        </div>                    
                    </div>
                    <div style={login2Style}>
                        <div className="login2-div1">
                            <LoginText/>
                        </div>                    
                    </div>
                </div>
            </div> 

            
            <div className="login-div2">
                <img src={Ellipse1} alt="" className="colorband1"/>

                <img src={Ellipse2} alt="" className="colorband2"/>

                <img src={Ellipse3} alt="" className="colorband3"/>

                <img src={Ellipse4} alt="" className="colorband4"/>

                <img src={Ellipse5} alt="" className="colorband5"/>

            </div>
          
        </div>
        <div className='login-div3'>
                <LoginForm/>
            </div>
    </div>
    )
}

export default LoginPage