import React, { Component } from 'react'
import './MainRightSection.css'

import {CalendarComponent} from "../../Components"
import {MainEnrolmentNotification} from "../../Components"

export class MainRightSection extends Component {
  render() {
    return (
      <div className='mainRightSection-container'>
        <CalendarComponent/>
        <MainEnrolmentNotification/>
      </div>
    )
  }
}

export default MainRightSection