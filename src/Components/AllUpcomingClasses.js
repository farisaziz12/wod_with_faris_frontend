import React, { Component } from 'react'
import PopPop from 'react-poppop';
import './AllUpcomingClasses.css'
import CoachClassCard from './CoachClassCard';

export default class AllUpcomingClasses extends Component {
    render() {
        const { show, upcomingClasses, handleCancel, user, toggleShow } = this.props
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
                    {upcomingClasses.map(upcomingClass => (
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
