import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../context/Context';
import { API_URL } from '../../utils/api';
import styling from './Points.module.css';

export const Points = () => {
  const { gameMode, mapGlobal, points, pointsMultiplier } = useGameStateContext();
  const [leaderboardData, setLeaderboardData] = useState([]);

  type ScoreType = { player: string; mode: string; size: number; points: number };

  const url = `${API_URL}/leaderboard?mode=${gameMode}&size=${mapGlobal.length}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLeaderboardData(data.scores);
      });
  }, []);
  return (
    <div className={styling.pointsSection}>
      <div className={styling.currentPointsSection}>
        <div className={styling.currentPointsTitle}>Points</div>
        <div className={styling.currentPointsCounter}>{points * pointsMultiplier}</div>
      </div>
      <div className={styling.leaderboardSection}>
        <div className={styling.leaderboardTitle}>Leaderboard</div>
        <div className={styling.leaderboardList}>
          {leaderboardData.map((player: ScoreType, index: number) => {
            const entry = (
              <div className={styling.leaderboardEntry} key={index}>
                <div className={styling.entryName}>{player.player}</div>
                <div className={styling.entryScore}>
                  {player.points * pointsMultiplier}
                </div>
              </div>
            );

            return entry;
          })}
        </div>
      </div>
    </div>
  );
};
