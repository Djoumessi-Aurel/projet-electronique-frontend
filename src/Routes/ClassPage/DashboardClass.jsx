import React, { Component } from 'react'
import './DashboardClass.css'

import {PageBody} from "../../Components"
import {NavBar} from '../../Components'

export class DashboardClass extends Component {
    
    render() {
        const pageType = "classe"
        const pageName = "Classes"
        return (
            <div className='dashboard-container'>
                <NavBar page={pageType}/>
                <PageBody page={pageType} pageName={pageName}/>
            </div>
            
        )
    }
}

export default DashboardClass