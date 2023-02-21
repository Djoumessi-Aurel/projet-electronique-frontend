import React, { useEffect, useState } from 'react'
import './MainEnrolmentNotification.css'
import { NavLink } from 'react-router-dom'

import {EnrolementCard} from '../../Components'
import axios from 'axios'

const MainEnrolmentNotification = () => {
  const url = "https://projet-electronique-backend-production.up.railway.app/api/etudiant/attente";
  const [enrolledInfo, setEnrol]=useState([]);
  const [nbreEtudiant, setNbreEtudiant] = useState(0)

  const getStudent = () =>{
    axios.get(url).then((res)=>{
      setEnrol(res.data.data)
      setNbreEtudiant(res.data.data.length)
      localStorage.setItem('studentList', JSON.stringify(res.data.data))
    }).catch(err=>{
      console.log(err);
    });
  }

  useEffect(() => {
    getStudent()
  }, []);
  //useEffect(() => {
   // const list = JSON.parse(localStorage.getItem('studentList'))
  //  setEnrol(list)
  //}, []);

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
   /* const enrolledInfo = [
      {
        id: 1,
        class: "4GI",
        color: {backgroundColor: "#A64AEE"},
        name: "KEGNE MYRIAM ARMELLE",
        matricule: "19P001",
        date:"29 Nov, 2022"
      },
      {
        id: 2,
        class: "4GC",
        color: {backgroundColor: "#F69A36"},
        name: "YEMKWA EMMANUEL",
        matricule: "19P003",
        date:"02 Dec, 2022"
      },
      {
        id: 3,
        class: "4GELE",
        color: {backgroundColor: "#453CC9"},
        name: "DJOUMESSI AUREL",
        matricule: "21P001",
        date:"05 Dec, 2022"
      },
      {
        id: 4,
        class: "5GM",
        color: {backgroundColor: "#EC5555"},
        name: "EWOKI VALERIE",
        matricule: "18P001",
        date:"06 Dec, 2022"
      },
      {
        id: 5,
        class: "MSP2",
        color: {backgroundColor: "#FFCD4D"},
        name: "MENRA ROMIAL",
        matricule: "21P054",
        date:"12 Dec, 2022"
      }
    ]*/

    const enrolledstudents = enrolledInfo.map((info) => 
    <EnrolementCard
      key={info.id}
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