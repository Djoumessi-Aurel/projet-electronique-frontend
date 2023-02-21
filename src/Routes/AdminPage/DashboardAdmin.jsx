import React, { Component } from 'react'
import './DashboardAdmin.css'

import {PageBody} from "../../Components"
import {NavBar} from '../../Components'

export class DashboardAdmin extends Component {
    
    render() {
        const pageType = "admin"
        const pageName = "Administrateurs"
        return (
            <div className='dashboard-container'>
                <NavBar page={pageType}/>
                <PageBody page={pageType} pageName={pageName}/>
            </div>
            
        )
    }
}

export default DashboardAdmin