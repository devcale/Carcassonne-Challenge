import './Points.css';

export const Points = () => {
  return (
    <div className="points-section">
      <div className="current-points-section">
        <div className="current-points-title">Points</div>
        <div className="current-points-counter"></div>
      </div>
      <div className="leaderboard-section">
        <div className="leaderboard-title">Leaderboard</div>
        <div className="leaderboard"></div>
      </div>
    </div>
  );
};
