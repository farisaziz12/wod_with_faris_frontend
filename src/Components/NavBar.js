import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ReactGA from 'react-ga';
import './NavBar.css'

const lastPage = localStorage.getItem('prevUrl')

export default function NavBar(props) {
    const [page, setPage] = useState(null)

    useEffect(() => {
        setPage(lastPage? lastPage : '/')
    }, [])


    const handleActiveBtnChange = (e) => {
        if(e.target.name === '/profile' || e.target.name === '/classes' || e.target.name === '/leaderboard') {
            props.currentUser? setPage(e.target.name) : setPage('/login')
            if(e.target.name === '/'){
                props.setHome(true)
                localStorage.setItem('prevUrl', '/')
            } else {
                localStorage.setItem('prevUrl', e.target.name)
                props.setHome(false)
            }
            props.userData&&
            ReactGA.event({
                category: 'User',
                action: `${props.userData.first_name + " " + props.userData.last_name} looked at ${e.target.name}`
            });
        } else if (e.target.name === '/login'){
            localStorage.setItem('prevUrl', '/')
            props.setHome(true)
        } else {
            setPage(e.target.name)
            if(e.target.name === '/'){
                props.setHome(true)
                localStorage.setItem('prevUrl', '/')
            } else {
                localStorage.setItem('prevUrl', e.target.name)
                props.setHome(false)
            }
            props.userData&&
            ReactGA.event({
                category: 'User',
                action: `${props.userData.first_name + " " + props.userData.last_name} looked at ${e.target.name}`
            });
        }
    }

        const { currentUser, userData } = props
        return (
            <div className='nav-bar'>
                <NavLink to='/'>
                    <button onClick={handleActiveBtnChange} name='/' className={page === '/'? 'nav-btn active' : 'nav-btn'}>Home</button>
                </NavLink>
                {currentUser&& userData&& userData.coach&&
                    <NavLink to='/createclass'>
                        <button onClick={handleActiveBtnChange} name='/createclass' className={page === '/createclass'? 'nav-btn active' : 'nav-btn'}>Create Class</button>
                    </NavLink>
                }
                {currentUser&& userData&& userData.coach&&
                    <NavLink to='/createptsession'>
                        <button onClick={handleActiveBtnChange} name='/createptsession' className={page === '/createptsession'? 'nav-btn active' : 'nav-btn'}>Create PT Session</button>
                    </NavLink>
                }
                {currentUser&& userData&& userData.coach&&
                    <NavLink to='/clients'>
                        <button onClick={handleActiveBtnChange} name='/clients' className={page === '/clients'? 'nav-btn active' : 'nav-btn'}>Clients</button>
                    </NavLink>
                }
                {currentUser&& userData&& !userData.coach&&
                <NavLink to='/classes'>
                    <button onClick={handleActiveBtnChange} name='/classes' className={page === '/classes'? 'nav-btn active' : 'nav-btn'}>Book Class</button>
                </NavLink>
                }
                {currentUser&& userData&& !userData.coach&&
                <NavLink to='/logactivity'>
                    <button onClick={handleActiveBtnChange} name='/logactivity' className={page === '/logactivity'? 'nav-btn active' : 'nav-btn'}>Log Activity</button>
                </NavLink>
                }
                {currentUser&& userData&& !userData.coach&&
                <NavLink to='/buypasses'>
                    <button onClick={handleActiveBtnChange} name='/buypasses' className={page === '/buypasses'? 'nav-btn active' : 'nav-btn'}>Buy Passes</button>
                </NavLink>
                }
                {currentUser&& userData&& !userData.coach&&
                <NavLink to='/leaderboard'>
                    <button onClick={handleActiveBtnChange} name='/leaderboard' className={page === '/leaderboard'? 'nav-btn active' : 'nav-btn'}>Leaderboard</button>
                </NavLink>
                }
                {currentUser&&
                <NavLink to='/profile'>
                    <button onClick={handleActiveBtnChange} name='/profile' className={page === '/profile'? 'nav-btn active' : 'nav-btn'}>Profile</button>
                </NavLink >
                }
                {currentUser?
                <button className='nav-btn' onClick={props.logout}>Log Out</button> 
                :
                <NavLink to='/login'>
                    <button onClick={handleActiveBtnChange} name='/login' className={page === '/login'? 'nav-btn active' : 'nav-btn'}>Log In</button>
                </NavLink>
                }
                <h3 className='logo-2'>WOD WITH FARIS</h3>
            </div>
        )
}
