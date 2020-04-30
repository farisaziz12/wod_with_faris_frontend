import React, { useState, useEffect } from 'react'
import LeaderboardStat from './LeaderboardStat'
import './LeaderboardStat.css'

export default function Leaderboard() {

    useEffect(() => {
        fetch('http://localhost:3001/usersession/getallattendances').then(resp => resp.json()).then(stats => setLeaderboardStats(stats))
    }, [])

    const [leaderboardStats, setLeaderboardStats] = useState([])
    
    const sortedLeaderboardStats = leaderboardStats.sort((a, b) => b.attendances - a.attendances)

    const attendance = leaderboardStats.map(stat => (stat.attendances))

    const highestNoOfAttendances = Math.max.apply(Math, attendance);

    return (
        <div>
            <h1>Leaderboard</h1>
            <div className='stats-container'>
            <table className='leaderboard-table' >
                <tr>
                    <th>Name</th>
                    <th>Total Class Attendances</th> 
                    <th>Total Calories Burned</th>
                </tr>
                {sortedLeaderboardStats.map(stat => (
                    <LeaderboardStat stat={stat} highestNoOfAttendances={highestNoOfAttendances}/>
                ))}
                </table>
            </div>
        </div>
    )
}
