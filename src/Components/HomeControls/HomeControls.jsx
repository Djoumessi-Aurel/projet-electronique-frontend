import React from 'react'
import './HomeControls.css'

import {HomeControlButton} from "../../Components"
import EnrolStudents from "../../assets/Images/EnrolStudents.png"
import Class from "../../assets/Images/Class.png"
import Courses from "../../assets/Images/Courses.png"
import Admin from "../../assets/Images/Admin.png"
import { useSelector } from 'react-redux'


const HomeControls =  () => {
    
    const nbClasses = useSelector(state => state.classes.array.length)
    const nbCours = useSelector(state => state.cours.array.length)
    const nbrEtudiant = useSelector(state => state.etudiant.array.length)
    const nbreAdmin = useSelector(state => state.admin.array.length)

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