import React, { Component } from 'react'
import './MainBody.css'

import {MainLeftSection} from '..'
import {MainRightSection} from '..'

export class MainBody extends Component {
  render() {
    const page = this.props.page
    return (
        <div className='mainBody-container'>
            <MainLeftSection page={page}/>
            <MainRightSection/>
        </div>
    )
  }
}

export default MainBody