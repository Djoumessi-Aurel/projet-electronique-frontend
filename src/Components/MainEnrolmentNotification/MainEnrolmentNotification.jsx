import React from 'react'
import './MainEnrolmentNotification.css'
import { NavLink } from 'react-router-dom'

import {EnrolementCard} from '../../Components'
import { useSelector } from 'react-redux'

const MainEnrolmentNotification = () => {

  const enrolledInfo = useSelector(state => state.etudiant.array.filter(value => value.statut === false)) //enrollements en attente
  const nbreEtudiant = enrolledInfo.length


      const department = ["GI", "GET", "GELE", "GIND", "GM", "GTEL", "GC", "MSP"]
      const departmentColor = [
        {
          name:'GI',
          color: {backgroundColor: "#29ABF4"}
        },
        {
          name:'GET',
          color: {backgroundColor: "#38BC74"}
        },
        {
          name:'GELE',
          color: {backgroundColor: "#453CC9"}
        },
        {
          name:'GIND',
          color: {backgroundColor: "#3D256A"}
        },
        {
          name:'GM',
          color: {backgroundColor: "#EC5555"}
        },
        {
          name:'GTEL',
          color: {backgroundColor: "#A64AEE"}
        },
        {
          name:'GC',
          color: {backgroundColor: "#F69A36"}
        },
        {
          name:'MSP',
          color: {backgroundColor: "#FFCD4D"}
        }
      ]

    const enrolledstudents = enrolledInfo.map((info, index) => 
    <EnrolementCard
      key={index}
      class = {info.classe.nom}
      color = {departmentColor[department.indexOf((info.classe.nom).substring(1))].color}
      name = {info.nom}
      matricule = {info.matricule}
      date = {info.dateCreation}
    />)
    return (
      <div className='Notification-container'>
        <div className="Notification-container-div">
          <div className="notif-enrol-number-div">
            <span className="notif-enrol">Enrôlement</span>
            <span className="notif-number">{nbreEtudiant}</span>
          </div>
          <NavLink to='/etudiant' className="notif-viewall">Tout Regarder</NavLink>
        </div>
        {enrolledstudents}
      </div>
    )
  }


export default MainEnrolmentNotification