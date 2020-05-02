import React, { useState, useEffect } from 'react'
import LeaderboardStat from './LeaderboardStat'
import './LeaderboardStat.css'

const realLink = 'https://wod-with-faris.herokuapp.com/usersession/getallattendances'
const testLink = 'http://localhost:3001/users/getallattendances'

export default function Leaderboard() {

    useEffect(() => {
        fetch(testLink).then(resp => resp.json()).then(stats => setLeaderboardStats(stats))
    }, [])

    const [leaderboardStats, setLeaderboardStats] = useState([])
 
    const sortedLeaderboardStats = leaderboardStats[0]&& leaderboardStats.sort((a, b) => b.attendances_and_activities - a.attendances_and_activities)

    const attendances_and_activities = leaderboardStats[0]&& leaderboardStats.map(stat => (stat.attendances_and_activities))

    const highestNoOfAttendances = Math.max.apply(Math, attendances_and_activities);

    return (
        <div>
            <h1>Leaderboard</h1>
            <div className='stats-container'>
                <table className='leaderboard-table' >
                    <tr>
                        <th>Name</th>
                        <th>Classes/Activities</th> 
                        <th>Calories Burned</th>
                    </tr>
                    {sortedLeaderboardStats&& sortedLeaderboardStats.map(stat => (
                        <LeaderboardStat stat={stat} highestNoOfAttendances={highestNoOfAttendances}/> 
                    ))}
                </table>
            </div>
        </div>
    )
}
