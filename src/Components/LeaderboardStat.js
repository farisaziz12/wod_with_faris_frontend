import React from 'react'
import './LeaderboardStat.css'

export default function LeaderboardStat(props) {

    const { user, attendances_and_activities, calories_burned } = props.stat
    
    return (
        <tr className='leaderboard-stat' style={props.highestNoOfAttendances === attendances_and_activities? {color: "white", backgroundColor: "green"} : null}>
            <td>{user}</td>
            <td>{attendances_and_activities}</td>
            <td>~{calories_burned} Cal.</td>
        </tr>
    )
}
