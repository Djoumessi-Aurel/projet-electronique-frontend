import React, { Component } from 'react'
import "./MainHeader.css"

import {ProfileHeader} from '..'
import {PageNameHeader} from '..'

export class MainHeader extends Component {
  render() {
    const pageName = this.props.pageName
    return (
      <div className='mainTopHeader-container'>
        <ProfileHeader/>
        <PageNameHeader pageName={pageName}/>
      </div>
    )
  }
}

export default MainHeader