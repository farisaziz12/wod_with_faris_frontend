import React, { Component } from 'react'
import app from '../base'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default class NavBar extends Component {

    state = {
        page: null
    }

    componentDidMount() {
        this.setState({page: window.location.pathname})
    }

    handleActiveBtnChange = (e) => {
        if(e.target.name === '/profile' || e.target.name === '/classes'){
            this.props.currentUser? this.setState({page: e.target.name}) : this.setState({page: '/login'}) 
        } else {
            this.setState({page: e.target.name})
        }
    }

    render() {
        const { page } = this.state 
        const { currentUser, userData } = this.props
        return (
            <div className='nav-bar'>
                <NavLink to='/'>
                    <button onClick={this.handleActiveBtnChange} name='/' className={page === '/'? 'nav-btn active' : 'nav-btn'}>Home</button>
                </NavLink>
                {currentUser&& userData&& userData.coach&&
                    <NavLink to='/createclass'>
                        <button onClick={this.handleActiveBtnChange} name='/createclass' className={page === '/createclass'? 'nav-btn active' : 'nav-btn'}>Create Class</button>
                    </NavLink>
                }
                {currentUser&&
                <>
                <NavLink to='/classes'>
                    <button onClick={this.handleActiveBtnChange} name='/classes' className={page === '/classes'? 'nav-btn active' : 'nav-btn'}>Book Class</button>
                </NavLink>
                <NavLink to='/profile'>
                    <button onClick={this.handleActiveBtnChange} name='/profile' className={page === '/profile'? 'nav-btn active' : 'nav-btn'}>Profile</button>
                </NavLink >
                </>
                }
                {currentUser?
                <button className='nav-btn' onClick={this.props.logout}>Log Out</button> 
                :
                <NavLink to='/login'>
                    <button onClick={this.handleActiveBtnChange} name='/login' className={page === '/login'? 'nav-btn active' : 'nav-btn'}>Log In</button>
                </NavLink>
                }
                <h3 className='logo-2'>WOD WITH FARIS</h3>
            </div>
        )
    }
}
