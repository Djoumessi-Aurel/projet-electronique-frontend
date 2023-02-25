import React, { Component } from 'react'
import './NavBar.css'

import { NavLink } from 'react-router-dom'
import HomeMainTextContent from '../../assets/Images/HomeMainTextContent.svg'

import { ReactComponent as HomeIcon } from '../../assets/Images/Icon1.svg'
import { ReactComponent as EnrolIcon } from '../../assets/Images/Icon2.svg'
import { ReactComponent as CourseIcon } from '../../assets/Images/Icon3.svg'
import { ReactComponent as ClassIcon } from '../../assets/Images/Icon4.svg'
import { ReactComponent as AdminIcon } from '../../assets/Images/Icon7.svg'
import { ReactComponent as PlanningIcon } from '../../assets/Images/Icon6.svg'
import { ReactComponent as PresenceIcon } from '../../assets/Images/Icon5.svg'


export class NavBar extends Component {
    render() {
        const currentLink = this.props.page

        const allLinks = [
            {
                id: "accueil",
                label: "Accueil",
                path: "/accueil",
                icon: <HomeIcon/>,
            },
            {
                id: "etudiant",
                label: "Etudiants Enrolés",
                path: "/etudiant",
                icon: <EnrolIcon/>,
            },
            {
                id: "classe",
                label: "Classes",
                path: "/classe",
                icon: <ClassIcon/>,
            },
            {
                id: "cours",
                label: "Cours",
                path: "/cours",
                icon: <CourseIcon/>,
            },
            {
                id: "admin",
                label: "Administrateurs",
                path: "/admin",
                icon: <AdminIcon/>,
            },
            {
                id: "planning",
                label: "Planning de cours",
                path: "/planning",
                icon: <PlanningIcon/>,
            },
            {
                id: "présence",
                label: "Présences",
                path: "/présence",
                icon: <PresenceIcon/>,
            }
        ]

        const NavLinks = allLinks.map((linkInfo, index) => 
        <li key={index}>
            <NavLink className={currentLink === linkInfo.id ? "activelink" : "linklayout-container"} to={linkInfo.path} end>
                {linkInfo.icon}
                <span>{linkInfo.label}</span>
            </NavLink>
        </li>)
        return(
            <nav className="navigation-container">
                <img src={HomeMainTextContent} alt="" className="navigation-container-img" />
                <ul className="navigation-list">
                    {NavLinks}
                </ul>
            </nav>
            
        )
    }
}

export default NavBar