import React, { useState, useEffect } from 'react'
import ClassCard from './ClassCard'
import CoachClassCard from './CoachClassCard'
import ReactGA from 'react-ga';
import AllUpcomingClasses from './AllUpcomingClasses';
import PTSessionCard from './PTSessionCard';
import CoachPTSessionCard from './CoachPTSessionCard';
import './Profile.css'

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/profile');
}

export default function Profile(props) {

    const [user, setUser] = useState(null)
    const [upcomingClasses, setUpcomingClasses] = useState([])
    const [upcomingPTSessions, setUpcomingPTSessions] = useState([])
    const [showUpcomingClasses, setShowUpcomingClasses] = useState(false)

    useEffect(() => {
        initializeReactGA()
        
        fetch(`https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => handleUser(user))


        fetch(`https://wod-with-faris-backend.herokuapp.com/usersession/upcomingclasses?email=${props.currentUser.email}`)
        .then(resp => resp.json())
        .then(upcoming => handleUpcomingClasses(upcoming))
    }, [props.currentUser.email])
    

    const handleUpcomingClasses = upcoming => {
        setUpcomingClasses(upcoming.classes)
        setUpcomingPTSessions(upcoming.ptsessions)
    }

    const handleUser = user => {
        setUser(user)
    }

    const addToken = () => {
        const updatedUser = {
            id: user.id,
            coach: user.coach,
            first_name: user.first_name,
            last_name: user.last_name, 
            email: user.email,
            tokens: user.tokens + 1
        }
        setUser(updatedUser)
     }

     const handleCancel = deletedBooking => {
         setUpcomingClasses(upcomingClasses.filter(booking => booking.class.id !== deletedBooking.session.id))
     }
     const handleDeleteClass = deletedClass => {
         setUpcomingClasses(upcomingClasses.filter(booking => booking.class.id !== deletedClass.id))
     }
     const handleDeletePTSession = deletedClass => {
         setUpcomingPTSessions(upcomingPTSessions.filter(ptSession => ptSession.ptsession.id !== deletedClass.id))
     }

    const toggleShowUpcomingClasses = show => {
        setShowUpcomingClasses(show)
    }

        const timeOrderedClasses = upcomingClasses[0]? upcomingClasses[0].class? upcomingClasses.sort((a, b) => new Date(a.class.date + "T" + a.class.time) - new Date(b.class.date + "T" + b.class.time)) : upcomingClasses.sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time)) : upcomingClasses
        const timeOrderedPTSessions = upcomingPTSessions[0]? upcomingPTSessions[0].ptsession? upcomingPTSessions.sort((a, b) => new Date(a.ptsession.date + " " + a.ptsession.time) - new Date(b.ptsession.date + " " + b.ptsession.time)) : upcomingPTSessions.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)) : upcomingPTSessions
        const orderedByDateUpcomingClasses = timeOrderedClasses&& timeOrderedClasses.sort((a, b) => new Date(a.date) - new Date(b.date))
        const orderedByDateUpcomingPTsessions = timeOrderedPTSessions&& timeOrderedPTSessions.sort((a, b) => new Date(a.date) - new Date(b.date))
        const SlicedUpcomingClasses = orderedByDateUpcomingClasses&& orderedByDateUpcomingClasses.slice(0, 2)
        const SlicedUpcomingPTSessions = orderedByDateUpcomingPTsessions&& orderedByDateUpcomingPTsessions.slice(0, 2)
        return (
            <div>
                <div className='profile-container'>
                    {user?
                    <>
                        <h1>{user.first_name + " " + user.last_name}</h1>
                        {!user.coach&& <h2 className='tokens'>Class Passes: {user.tokens}</h2>}
                        <div className='upcoming-classes-container'>
                            <div>
                            <h2 className='upcoming-classes-title'>Upcoming Classes: </h2>
                                {!user.coach&& upcomingClasses[0]&&
                                    SlicedUpcomingClasses.map(upcomingClass => (
                                        <ClassCard handleCancel={handleCancel} addToken={addToken} user={user} upcomingClass={upcomingClass.class}/>
                                    ))
                                }
                                {user.coach&& upcomingClasses[0]&&
                                <button onClick={() => toggleShowUpcomingClasses(true)} className='all-upcoming-classes-btn'>All upcoming classes</button>
                                }
                                {showUpcomingClasses&& <AllUpcomingClasses toggleShow={toggleShowUpcomingClasses} handleCancel={handleDeleteClass} user={user} show={showUpcomingClasses} upcomingClasses={orderedByDateUpcomingClasses}/>}
                                {user.coach&& upcomingClasses[0]&&
                                    SlicedUpcomingClasses.map(upcomingClass => (
                                        <CoachClassCard handleCancel={handleDeleteClass} user={user} coach={upcomingClass.coach} upcomingClass={upcomingClass.class}/>
                                    ))
                                }
                                {!upcomingClasses[0]&&<h3 className='none'>None</h3>}
                            </div>
                            <div className='upcoming-pt-sessions'>
                                <h2 className='upcoming-classes-title'>Upcoming PT Sessions: </h2>
                                {!user.coach&& upcomingPTSessions[0]&&
                                    SlicedUpcomingPTSessions.map(upcomingPTSession => (
                                        <PTSessionCard user={user} upcomingPTSession={upcomingPTSession}/>
                                    ))
                                }
                                {user.coach&& upcomingPTSessions[0]&&
                                    SlicedUpcomingPTSessions.map(upcomingPTSession => (
                                        <CoachPTSessionCard handleCancel={handleDeletePTSession} user={user} upcomingPTSession={upcomingPTSession.ptsession} client={upcomingPTSession.user}/>
                                    ))
                                }
                            </div>

                            {!upcomingPTSessions[0]&&<h3 className='none'>None</h3>}

                        </div>
                    </>
                    :
                    <button className='loading'></button >
                    }
                </div>
            </div>
        )
}
