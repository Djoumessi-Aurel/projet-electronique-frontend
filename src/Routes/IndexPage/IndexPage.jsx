import React, { Component } from 'react'
import './IndexPage.css'

import IndexBgImage from '../../assets/Images/IndexBgImage.jpg'
import {IndexLogo} from '../../Components'
import {IndexMiddle} from '../../Components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const IndexPage = () => {
  const navigate = useNavigate()

    useEffect(()=>{
        if (localStorage.getItem("token")) {navigate("/accueil");}
    }, [])

    const indexStyle = {
      backgroundImage: `url(${IndexBgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    }

    return (
      <div style={indexStyle}>
        <div className="index-container-div">
          <IndexLogo/>
          <IndexMiddle/>
        </div>
      </div>
    )
}

export default IndexPage