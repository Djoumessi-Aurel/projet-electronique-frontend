import React, { Component } from 'react'
import './EnrolementCard.css'

export class EnrolementCard extends Component {
  render() {
    return (
      <div className='enrolementcard-container'>
        <div className="enrol-info">
          <span className="enrol-class" style={this.props.color}><span>{this.props.class}</span></span>
          <div className="enrol-profile">
            <span className="enrol-name">{this.props.name}</span>
            <span className="enrol-date">{this.props.matricule} | {this.props.date}</span>
          </div>
        </div>
        <span className="enrol-status">Nouveau</span>
      </div>
    )
  }
}

export default EnrolementCard