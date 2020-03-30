import React, { Component } from 'react'
import './Profile.css'
import ClassCard from './ClassCard'
import CoachClassCard from './CoachClassCard'

export default class Profile extends Component {

    state = {
        user: null, 
        upcomingClasses: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/user/getuser?email=${this.props.currentUser.email}`)
        .then(resp => resp.json())
        .then(user => this.setState({user}))

        fetch(`http://localhost:3000/usersession/upcomingclasses?email=${this.props.currentUser.email}`)
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

    render() {
        const { user, upcomingClasses } = this.state
        const orderedByDateUpcomingClasses = upcomingClasses.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4)
        return (
            <div>
                <div className='profile-container'>
                    {user?
                    <>
                        <h1>{user.first_name + " " + user.last_name}</h1>
                        {!user.coach&& <h2 className='tokens'>Tokens: {user.tokens}</h2>}
                        <div className='upcoming-classes-container'>
                            <h2 className='upcoming-classes-title'>Upcoming Classes: </h2>
                            {!user.coach&& upcomingClasses[0]&&
                                orderedByDateUpcomingClasses.map(upcomingClass => (
                                    <ClassCard handleCancel={this.handleCancel} addToken={this.addToken} user={this.state.user} upcomingClass={upcomingClass}/>
                                ))
                            }
                            {user.coach&& upcomingClasses[0]&&
                                orderedByDateUpcomingClasses.map(upcomingClass => (
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
