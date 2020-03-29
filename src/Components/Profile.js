import React, { Component } from 'react'
import './Profile.css'
import ClassCard from './ClassCard'

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
         console.log(deletedBooking)
        this.setState({upcomingClasses: this.state.upcomingClasses.filter(booking => booking.id !== deletedBooking.session.id)})
     }

    render() {
        const { user, upcomingClasses } = this.state
        return (
            <div>
                <div className='profile-container'>
                    {user?
                    <>
                        <h1>{user.first_name + " " + user.last_name}</h1>
                        <h2 className='tokens'>Tokens: {user.tokens}</h2>
                        <div className='upcoming-classes-container'>
                            <h2 className='upcoming-classes-title'>Upcoming Classes: </h2>
                            {upcomingClasses[0]?
                                upcomingClasses.map(upcomingClass => (
                                    <ClassCard handleCancel={this.handleCancel} addToken={this.addToken} user={this.state.user} upcomingClass={upcomingClass}/>
                                ))
                            :

                            <h3 className='none'>None</h3>

                            }
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
