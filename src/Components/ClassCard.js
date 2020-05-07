import React, { Component } from 'react'
import dateFormat from 'dateformat'
import './Classes.css'

export default class ClassCard extends Component {


    handleCancelBooking = id => {
        fetch(`https://wod-with-faris-backend.herokuapp.com/usersession/unbook`, {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    session_id: id
                })
            }).then(resp => resp.json()).then(deletedBooking => this.props.handleCancel(deletedBooking)).then(this.props.addToken)
    }

    render() {
        const { upcomingClass } = this.props
        return (
            <div className='class-card'>
                <h2 className='card-title'>{upcomingClass.time + " " + upcomingClass.name}</h2>
                <p className='card-date'>{dateFormat(upcomingClass.date, "fullDate")}</p>
                <button onClick={() => this.handleCancelBooking(upcomingClass.id)} className='book-btn'>Cancel</button>
            </div>
        )
    }
}
