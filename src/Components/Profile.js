import React, { Component } from 'react'
import './Profile.css'
import ClassCard from './ClassCard'
import CoachClassCard from './CoachClassCard'
import ReactGA from 'react-ga';
import AllUpcomingClasses from './AllUpcomingClasses';
import PTSessionCard from './PTSessionCard';
import CoachPTSessionCard from './CoachPTSessionCard';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/profile');
}

export default class Profile extends Component {

    state = {
        user: null, 
        upcomingClasses: [],
        upcomingPTSessions: [],
        showUpcomingClasses: false
    }

    componentDidMount(){
        initializeReactGA()
        
        fetch(`https://wod-with-faris-backend.herokuapp.com/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => this.handleUser(user))


        fetch(`https://wod-with-faris-backend.herokuapp.com/usersession/upcomingclasses?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(upcomingClasses => this.setState({upcomingClasses: upcomingClasses.classes, upcomingPTSessions: upcomingClasses.ptsessions}))
    }

    handleUser = user => {
        this.setState({user})
    }

    addToken = () => {
        const { user } = this.state 
        this.setState({user: {
            id: user.id,
            coach: user.coach,
            first_name: user.first_name,
            last_name: user.last_name, 
            email: user.email,
            tokens: user.tokens + 1
        }})
     }

     handleCancel = deletedBooking => {
        console.log(deletedBooking)
        this.setState({upcomingClasses: this.state.upcomingClasses.filter(booking => booking.class.id !== deletedBooking.session.id)})
     }
     handleDeleteClass = deletedClass => {
        this.setState({upcomingClasses: this.state.upcomingClasses.filter(booking => booking.class.id !== deletedClass.id)})
     }
     handleDeletePTSession = deletedClass => {
        this.setState({upcomingPTSessions: this.state.upcomingPTSessions.filter(ptSession => ptSession.ptsession.id !== deletedClass.id)})
     }

    toggleShowUpcomingClasses = show => {
        this.setState({showUpcomingClasses: show })
    }

    render() {
        const { user, upcomingClasses, showUpcomingClasses, upcomingPTSessions } = this.state
        const timeOrderedClasses = upcomingClasses[0]&& upcomingClasses.sort((a, b) => new Date(a.class.date + "T" + a.class.time) - new Date(b.class.date + "T" + b.class.time))
        const timeOrderedPTSessions = upcomingPTSessions[0]&& upcomingPTSessions.sort((a, b) => new Date(a.ptsession.date + " " + a.ptsession.time) - new Date(b.ptsession.date + " " + b.ptsession.time))
        const orderedByDateUpcomingClasses = timeOrderedClasses&& timeOrderedClasses.sort((a, b) => new Date(a.class.date) - new Date(b.class.date))
        const orderedByDateUpcomingPTsessions = timeOrderedPTSessions&& timeOrderedPTSessions.sort((a, b) => new Date(a.ptsession.date) - new Date(b.ptsession.date))
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
                                        <ClassCard handleCancel={this.handleCancel} addToken={this.addToken} user={this.state.user} upcomingClass={upcomingClass.class}/>
                                    ))
                                }
                                {user.coach&& upcomingClasses[0]&&
                                <button onClick={() => this.toggleShowUpcomingClasses(true)} className='all-upcoming-classes-btn'>All upcoming classes</button>
                                }
                                {showUpcomingClasses&& <AllUpcomingClasses toggleShow={this.toggleShowUpcomingClasses} handleCancel={this.handleDeleteClass} user={this.state.user} show={showUpcomingClasses} upcomingClasses={orderedByDateUpcomingClasses}/>}
                                {user.coach&& upcomingClasses[0]&&
                                    SlicedUpcomingClasses.map(upcomingClass => (
                                        <CoachClassCard handleCancel={this.handleDeleteClass} user={this.state.user} coach={upcomingClass.coach} upcomingClass={upcomingClass.class}/>
                                    ))
                                }
                                {!upcomingClasses[0]&&<h3 className='none'>None</h3>}
                            </div>
                            <div className='upcoming-pt-sessions'>
                                <h2 className='upcoming-classes-title'>Upcoming PT Sessions: </h2>
                                {!user.coach&& upcomingPTSessions[0]&&
                                    SlicedUpcomingPTSessions.map(upcomingPTSession => (
                                        <PTSessionCard user={this.state.user} upcomingPTSession={upcomingPTSession}/>
                                    ))
                                }
                                {user.coach&& upcomingPTSessions[0]&&
                                    SlicedUpcomingPTSessions.map(upcomingPTSession => (
                                        <CoachPTSessionCard handleCancel={this.handleDeletePTSession} user={this.state.user} upcomingPTSession={upcomingPTSession.ptsession} client={upcomingPTSession.user}/>
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
}
