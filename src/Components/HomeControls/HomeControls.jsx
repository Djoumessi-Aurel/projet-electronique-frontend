import React, { useState, useEffect } from 'react'
import './HomeControls.css'

import {HomeControlButton} from "../../Components"
import EnrolStudents from "../../assets/Images/EnrolStudents.png"
import Class from "../../assets/Images/Class.png"
import Courses from "../../assets/Images/Courses.png"
import Admin from "../../assets/Images/Admin.png"
import axios from 'axios'


const HomeControls =  () => {
    const [nbreAdmin, setNbreAdmin] = useState(localStorage.getItem("nbreAdmin") || 0)
    const [nbrEtudiant, setEtudiant] = useState(localStorage.getItem("nbrEtudiant") || 0)
    const [nbClasses, setNbClasses] = useState(localStorage.getItem("nbClasses") || 0)
    const [nbCours, setNbCours] = useState(localStorage.getItem("nbCours") || 0)

    const updateTab= ()=>{
        const url = "https://projet-electronique-backend-production.up.railway.app/api/admin/all";
        axios.get(url).then((response) => {
          localStorage.setItem("nbreAdmin", response.data.length);
          setNbreAdmin(response.data.length)
        }).catch(error => {
          console.log(error)
        })
    };

    const getStudent = () =>{
        axios.get("https://projet-electronique-backend-production.up.railway.app/api/etudiant/").then((res)=>{
          setEtudiant(res.data.etudiantList.length)
          localStorage.setItem("nbrEtudiant", res.data.etudiantList.length)
          //localStorage.setItem('studentList', JSON.stringify(res.data.data))
        }).catch(err=>{
          console.log(err);
        });
      }

      const getClasses = () =>{
        axios.get("https://projet-electronique-backend-production.up.railway.app/api/classe/all").then((res)=>{
          setNbClasses(res.data.length)
          localStorage.setItem("nbClasses", res.data.length)
          //localStorage.setItem('studentList', JSON.stringify(res.data.data))
        }).catch(err=>{
          console.log(err);
        });
      }

      const getCours = () =>{
        axios.get("https://projet-electronique-backend-production.up.railway.app/api/cours/all").then((res)=>{
          setNbCours(res.data.length)
          localStorage.setItem("nbCours", res.data.length)
          //localStorage.setItem('studentList', JSON.stringify(res.data.data))
        }).catch(err=>{
          console.log(err);
        });
      }
    
      useEffect(() => {
        getStudent()
        getClasses()
        getCours()
      }, []);

    useEffect(() => {
        updateTab()
      }, [localStorage.getItem("nbreAdmin")]);

    const controlsLayout = [
        {
            bgColor: {backgroundImage: "linear-gradient(130deg, #C7E2EB, #2A9ADA)"},
            icon: EnrolStudents,
            label: "Etudiants Enrôlés",
            registeredNumber: nbrEtudiant,
            navigateTo: "/etudiant",
        },
        {
            bgColor: {backgroundImage: "linear-gradient(130deg, #A64AEE, #2A9ADA)"},
            icon: Class,
            label: "Classes",
            registeredNumber: nbClasses,
            navigateTo: "/classe",
        },
        {
            bgColor: {backgroundImage: "linear-gradient(130deg, #603FE3, #29ABF4)"},
            icon: Courses,
            label: "Cours",
            registeredNumber: nbCours,
            navigateTo: "/cours",
        },
        {
            bgColor: {backgroundImage: "linear-gradient(130deg, #603FE3, #86BAFC)"},
            icon: Admin,
            label: "Administrateurs",
            registeredNumber: nbreAdmin,
            navigateTo: "/admin",
        }
    ]

    const ControlsButton = controlsLayout.map((layout, index) =>
    <HomeControlButton key={index}
        bgColor = {layout.bgColor}
        icon = {layout.icon}
        label = {layout.label}
        registeredNumber = {layout.registeredNumber}
        navigateTo = {layout.navigateTo}
    />)
    
    return (
        <div className='homeControls-container'>
            {ControlsButton}
        </div>
    )
  
}

export default HomeControls