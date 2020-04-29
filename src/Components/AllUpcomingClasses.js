import React, { Component } from 'react'
import PopPop from 'react-poppop';
import './AllUpcomingClasses.css'
import CoachClassCard from './CoachClassCard';

export default class AllUpcomingClasses extends Component {
    render() {
        const { show, upcomingClasses, handleCancel, user, toggleShow } = this.props
        const timeOrderedClasses = upcomingClasses.sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
        return (
            <div>
                <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => toggleShow(false)}
                        closeOnOverlay={true}>
                <div className='all-upcoming-classes-container'>
                    <h1 className='header'>All Upcoming Classes</h1>
                    {timeOrderedClasses.map(upcomingClass => (
                        <>
                            <CoachClassCard handleCancel={handleCancel} user={user} upcomingClass={upcomingClass}/>
                        </>
                    ))}
                </div>
                </PopPop>
            </div>
        )
    }
}
