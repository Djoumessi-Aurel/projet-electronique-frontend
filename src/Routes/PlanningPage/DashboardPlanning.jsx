import React, { Component } from 'react'
import './DashboardPlanning.css'

import {PageBody} from "../../Components"
import {NavBar} from '../../Components'

export class DashboardPlanning extends Component {
    
    render() {
        const pageType = "planning"
        const pageName = "Planning de cours"
        return (
            <div className='dashboard-container'>
                <NavBar page={pageType}/>
                <PageBody page={pageType} pageName={pageName}/>
            </div>
            
        )
    }
}

export default DashboardPlanning