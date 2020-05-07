import React, { useState } from 'react'
import Select from 'react-select'
import './ActivityLogger.css'

let today = new Date()
let dd = today.getDate(); 
let mm = today.getMonth() + 1; 

let yyyy = today.getFullYear(); 
if (dd < 10) { 
    dd = '0' + dd; 
} 
if (mm < 10) { 
    mm = '0' + mm; 
} 
let todaydate = yyyy + '-' + mm + '-' + dd; 

export default function ActivityLogger(props) {
    const [name, setName] = useState(null)
    const [date, setDate] = useState(todaydate)
    const [activityType, setActivityType] = useState(null)
    const [caloriesBurned, setCaloriesBurned] = useState(null)
    const [workout, setWorkout] = useState(null)
    const [duration, setDuration] = useState(null)
    const [burnFactor, setBurnFactor] = useState(null)
    const [success, setSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const options = [
        { value: 'CrossFit', label: 'CrossFit', calBurnPerMin: 17 },
        { value: 'HIIT', label: 'HIIT', calBurnPerMin: 13 },
        { value: 'Run', label: 'Run', calBurnPerMin: 10 },
        { value: 'Walk', label: 'Walk', calBurnPerMin: 3.5 },
        { value: 'Bike', label: 'Bike', calBurnPerMin: 10 },
        { value: 'Swim', label: 'Swim', calBurnPerMin: 9 },
        { value: 'Mobility', label: 'Mobility', calBurnPerMin: 3 },
        { value: 'Yoga', label: 'Yoga', calBurnPerMin: 3 },
        { value: 'Weightlifting', label: 'Weightlifting', calBurnPerMin: 6.5 },
        { value: 'Body Building', label: 'Body Building', calBurnPerMin: 6.5 },
        { value: 'Calisthenics', label: 'Calisthenics', calBurnPerMin: 6 },
        { value: 'Skipping Rope', label: 'Skipping Rope', calBurnPerMin: 14 },
        { value: 'Gymnastics', label: 'Gymnastics', calBurnPerMin: 6 }
    ]

    const setWorkoutTypeAndCalBurnFactor = e => {
        setActivityType(e.value)
        setBurnFactor(e.calBurnPerMin)
    }

    const handleDurationChange = e => {
        const duration = e.target.value

        if (duration >= 0){
            setDuration(duration)
        }
        
        if (burnFactor) {
            setCaloriesBurned(burnFactor * duration)
        }
    }

    const handleSuccess = () => {
        setSuccess("Activity Logged!")
        setErrorMessage("")
        setName("")
        setWorkout("")
        setDate("")
        setDuration("")
        setCaloriesBurned("")
    }

    const handleSubmit = () => {
        if ( name && workout && date && activityType && caloriesBurned && duration  ){
            fetch("https://wod-with-faris-backend.herokuapp.com/activities/create", {
                    method: "POST", 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name, 
                        workout: workout,
                        date: date,
                        activity_type: activityType,
                        calories_burned: caloriesBurned,
                        duration: duration, 
                        user_email: props.currentUser.email
                    })
                }).then(resp => resp.json()).then(handleSuccess)
                .catch(errorMessage => setErrorMessage(errorMessage))
            } else {
                setErrorMessage("Please fill all fields")
            }
    }    

    return (
        <div>
            <h1>Log Activity</h1>
            <div className='activity-log-form'>
                {errorMessage&& <p className='error'>{errorMessage}</p>}
                <label className='activity-input-label'>Name</label>
                <input value={name} className='activity-input' type='text' onChange={(e) => setName(e.target.value)}/>
                <label className='activity-input-label'>Date</label>
                <input value={date} className='activity-input' type='date' onChange={(e) => setDate(e.target.value)}/>
                <label className='activity-input-label'>Activity Type</label>
                <Select className='activity-input' options={options} onChange={setWorkoutTypeAndCalBurnFactor}/>
                <label className='activity-input-label'>Workout</label>
                <textarea placeholder='e.g. 50Km Bike, 300 Double unders' value={workout} className='activity-input' type='text' onChange={(e) => setWorkout(e.target.value)}/>
                <label className='activity-input-label'>Duration (Minutes)</label>
                <input value={duration} className='activity-input' type='number' onChange={handleDurationChange}/>
                <label className='activity-input-label'>Calories Burned</label>
                <input value={caloriesBurned} className='activity-input' type='number' onChange={(e) => setCaloriesBurned(e.target.value)}/>
                <button onClick={handleSubmit} className='submit-btn' type='submit'>Submit</button>
                {success&& <p className='success'>{success}</p>}
            </div>
        </div>
    )
}
