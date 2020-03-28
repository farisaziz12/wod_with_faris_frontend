import React, { Component } from 'react'
import app from '../base'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        const { currentUser } = this.props
        return (
            <div>
                <NavLink to='/'>
                    <button>Home</button>
                </NavLink>
                <NavLink to='/classes'>
                    <button>Book Class</button>
                </NavLink>
                <NavLink to='/profile'>
                    <button>Profile</button>
                </NavLink>
                {currentUser?
                <button onClick={this.props.logout}>Log Out</button> 
                :
                <NavLink to='/login'>
                    <button>Log In</button>
                </NavLink>
                }
            </div>
        )
    }
}
