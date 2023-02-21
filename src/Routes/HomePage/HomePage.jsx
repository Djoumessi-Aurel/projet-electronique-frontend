import React, { Component } from 'react'
import './HomePage.css'

import { Button } from '../../Components'
import { NavBar } from '../../Components'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                HomePage
                <Button/>
            </div>
            
        )
    }
}

export default HomePage