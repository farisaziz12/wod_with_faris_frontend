import React from 'react'
import './LeaderboardStat.css'

export default function LeaderboardStat(props) {

    const { user, attendances } = props.stat

    const caloriesBurned  = 500 * attendances

    return (
        <tr className='leaderboard-stat' style={props.highestNoOfAttendances === attendances? {color: "white", backgroundColor: "green"} : null}>
            <td>{user}</td>
            <td>{attendances}</td>
            <td>~{caloriesBurned} Cal.</td>
        </tr>
    )
}
