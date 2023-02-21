import React, { Component } from 'react'
import './IndexPage.css'

import IndexBgImage from '../../assets/Images/IndexBgImage.jpg'
import {IndexLogo} from '../../Components'
import {IndexMiddle} from '../../Components'

export class IndexPage extends Component {
  render() {
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
}

export default IndexPage