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
                    <h3 className='schedule-h3'>Classes with less than 2 people will be cancelled 2 hours before class start time</h3>
                    <p><strong>Monday:</strong> None</p>
                    <p><strong>Tuesday:</strong> Workout of the Day @ 18:30</p>
                    <p><strong>Wednesday:</strong> Core360 @ 18:30</p>
                    <p><strong>Thursday:</strong> Workout of the Day @ 18:30</p>
                    <p><strong>Friday:</strong> None</p>
                    <p><strong>Saturday:</strong> Mobility Class @ 11:00</p>
                    <p><strong>Sunday:</strong> Workout of the Day @ 15:00</p>
                    <Link to='/classes'><button className='class-link'>Book a Class</button></Link>
                </div>
                </PopPop>
            </div>
        )
    }
}
   