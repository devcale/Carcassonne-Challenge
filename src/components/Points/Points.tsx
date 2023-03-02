import './Points.css';

import { useGameStateContext } from '../../helper/Context';

export const Points = () => {
  const { points } = useGameStateContext();
  return (
    <div className="points-section">
      <div className="current-points-section">
        <div className="current-points-title">Points</div>
        <div className="current-points-counter">{points * 100}</div>
      </div>
      <div className="leaderboard-section">
        <div className="leaderboard-title">Leaderboard</div>
        <div className="leaderboard"></div>
      </div>
    </div>
  );
};
