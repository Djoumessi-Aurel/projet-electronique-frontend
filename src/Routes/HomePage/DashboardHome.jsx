import React, { Component } from 'react'
import './DashboardHome.css'

import {PageBody} from "../../Components"
import {NavBar} from '../../Components'

export class DashboardHome extends Component {
    render() {
        const pageType = "accueil"
        const pageName = "Accueil"
        return (
            <div className='dashboard-container'>
                <NavBar page={pageType}/>
                <PageBody page={pageType} pageName={pageName}/>
            </div>
            
        )
    }
}

export default DashboardHome