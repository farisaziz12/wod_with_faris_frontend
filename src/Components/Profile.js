import React, { Component } from 'react'
import './Profile.css'
import ClassCard from './ClassCard'
import CoachClassCard from './CoachClassCard'
import ReactGA from 'react-ga';
import AllUpcomingClasses from './AllUpcomingClasses';

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);
    ReactGA.pageview('/profile');
}

export default class Profile extends Component {

    state = {
        user: null, 
        upcomingClasses: [],
        showUpcomingClasses: false 
    }

    componentDidMount(){
        initializeReactGA()
        
        fetch(`https://wod-with-faris.herokuapp.com/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => this.setState({user}))

        fetch(`https://wod-with-faris.herokuapp.com/usersession/upcomingclasses?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(upcomingClasses => this.setState({upcomingClasses}))
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
        this.setState({upcomingClasses: this.state.upcomingClasses.filter(booking => booking.id !== deletedBooking.session.id)})
     }
     handleDelete = deletedClass => {
        this.setState({upcomingClasses: this.state.upcomingClasses.filter(booking => booking.id !== deletedClass.id)})
     }

    toggleShow = show => {
        this.setState({showUpcomingClasses: show })
    }

    render() {
        const { user, upcomingClasses, showUpcomingClasses } = this.state
        const timeOrderedClasses = upcomingClasses[0]&& upcomingClasses.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
        const orderedByDateUpcomingClasses = timeOrderedClasses&& timeOrderedClasses.sort((a, b) => new Date(a.date) - new Date(b.date))
        const SlicedUpcomingClasses = orderedByDateUpcomingClasses&& orderedByDateUpcomingClasses.slice(0, 4)
        return (
            <div>
                <div className='profile-container'>
                    {user?
                    <>
                        <h1>{user.first_name + " " + user.last_name}</h1>
                        {!user.coach&& <h2 className='tokens'>Class Passes: {user.tokens}</h2>}
                        <div className='upcoming-classes-container'>
                            <h2 className='upcoming-classes-title'>Upcoming Classes: </h2>

                            {!user.coach&& upcomingClasses[0]&&
                                SlicedUpcomingClasses.map(upcomingClass => (
                                    <ClassCard handleCancel={this.handleCancel} addToken={this.addToken} user={this.state.user} upcomingClass={upcomingClass}/>
                                ))
                            }
                            {user.coach&& upcomingClasses[0]&&
                                <button onClick={() => this.toggleShow(true)} className='all-upcoming-classes-btn'>All upcoming classes</button>
                            }
                            {showUpcomingClasses&& <AllUpcomingClasses toggleShow={this.toggleShow} handleCancel={this.handleDelete} user={this.state.user} show={showUpcomingClasses} upcomingClasses={orderedByDateUpcomingClasses}/>}
                            {user.coach&& upcomingClasses[0]&&
                                SlicedUpcomingClasses.map(upcomingClass => (
                                    <CoachClassCard handleCancel={this.handleDelete} user={this.state.user} upcomingClass={upcomingClass}/>
                                ))
                            }

                            {!upcomingClasses[0]&&<h3 className='none'>None</h3>}

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
