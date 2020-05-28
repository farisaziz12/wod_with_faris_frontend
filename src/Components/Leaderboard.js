import React, { useState, useEffect } from "react";
import LeaderboardStat from "./LeaderboardStat";
import "./LeaderboardStat.css";

export default function Leaderboard() {
  useEffect(() => {
    fetch(
      "https://wod-with-faris-backend.herokuapp.com/users/getallattendances"
    )
      .then((resp) => resp.json())
      .then((stats) => handleLeaderboardStats(stats));
  }, []);

  const [leaderboardStats, setLeaderboardStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLeaderboardStats = (leaderboardStats) => {
    setLeaderboardStats(leaderboardStats);
    setIsLoading(false);
  };

  const sortedLeaderboardStats =
    leaderboardStats[0] &&
    leaderboardStats.sort(
      (a, b) => b.attendances_and_activities - a.attendances_and_activities
    );

  const attendances_and_activities =
    leaderboardStats[0] &&
    leaderboardStats.map((stat) => stat.attendances_and_activities);

  const highestNoOfAttendances = Math.max.apply(
    Math,
    attendances_and_activities
  );

  return (
    <div>
      <h1 style={{ color: "white" }}>Leaderboard</h1>
      <div className="stats-container">
        <table className="leaderboard-table">
          <tr>
            <th>Name</th>
            <th>Classes</th>
            <th>Cal. Burned</th>
          </tr>
          {sortedLeaderboardStats &&
            sortedLeaderboardStats.map((stat) => (
              <LeaderboardStat
                stat={stat}
                highestNoOfAttendances={highestNoOfAttendances}
              />
            ))}
        </table>
        {isLoading && (
          <div className="loading-btn-div">
            <button className="loading"></button>
          </div>
        )}
      </div>
    </div>
  );
}
