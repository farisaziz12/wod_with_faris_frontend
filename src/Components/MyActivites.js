import React, { useState, useEffect } from 'react'
import PopPop from 'react-poppop';
import Activity from './Activity';
import './MyActivities.css'

export default function MyActivites(props) {
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { show, toggleShow, user } = props
    
    useEffect(() => {
        fetch(`https://wod-with-faris.herokuapp.com/activities/getuseractivities?user_email=${user.email}`)
        .then(resp => resp.json()).then(activities => handleActivities(activities))
    }, [user.email])

    const handleActivities = activities => {
        setActivities(activities)
        setIsLoading(false)
    }
    
    const dateSortedActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date))
     return (
        <div>
            <PopPop position="centerCenter"
                        open={show}
                        closeBtn={true}
                        closeOnEsc={true}
                        onClose={() => toggleShow(false)}
                        closeOnOverlay={true}>
                <div className='my-activities-container'>
                    <h1 className='my-activities-title'>My Activities</h1>
                    {isLoading&& <button className='loading'></button >}
                    {!isLoading && !activities[0]&& <h1>None</h1>}
                    {activities[0] && !isLoading&&
                        dateSortedActivities.map(activity => (
                            <Activity activity={activity}/>
                        ))
                    }
                </div>
            </PopPop>
        </div>
    )
}
