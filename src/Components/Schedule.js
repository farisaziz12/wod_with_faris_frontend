import React, { Component } from 'react'
import PopPop from 'react-poppop';
import './Schedule.css';
import { Link } from 'react-router-dom';

export default class Schedule extends Component {

    render() {
        const { show, toggleShow } = this.props
        return (
            <div>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => toggleShow(false)}
                        closeOnOverlay={true}>
                <h1 className='schedule-title'>Schedule</h1>
                <div className='schedule-container'>
                    <h3 className='schedule-h3'>Classes with less than 2 people will be cancelled 2 hours before class start time and early morning classes will be cancelled the night before at 20:00</h3>
                    <p><strong>Monday:</strong> None</p>
                    <p><strong>Tuesday:</strong> Workout of the Day @ 7:00</p>
                    <p><strong>Wednesday:</strong> None</p>
                    <p><strong>Thursday:</strong> Core360 @ 7:00</p>
                    <p><strong>Friday:</strong> Workout of the Day @ 7:00</p>
                    <p><strong>Saturday:</strong> Mobility Class @ 10:00 & Core360 @ 10:30</p>
                    <p><strong>Sunday:</strong> Mobility Class @ 10:00 & Workout of the Day @ 10:30</p>
                    <Link to='/classes'><button className='class-link'>Book a Class</button></Link>
                    <p><strong>Email <a href='mailto:faziztraining@gmail.com'>faziztraining@gmail.com</a> if you would like to suggest a new class time</strong></p>
                </div>
                </PopPop>
            </div>
        )
    }
}
   