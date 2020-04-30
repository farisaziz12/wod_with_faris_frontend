import React, { useState, useEffect } from 'react'
import LeaderboardStat from './LeaderboardStat'
import './LeaderboardStat.css'

export default function Leaderboard() {

    useEffect(() => {
        fetch('http://localhost:3001/usersession/getallattendances').then(resp => resp.json()).then(stats => setLeaderboardStats(stats))
    }, [])

    const [leaderboardStats, setLeaderboardStats] = useState([])


    return (
        <div>
            <h1>Leaderboard</h1>
            <div className='stats-container'>
                {leaderboardStats.map(stat => (
                    <LeaderboardStat stat={stat} />
                ))}
            </div>
        </div>
    )
}
