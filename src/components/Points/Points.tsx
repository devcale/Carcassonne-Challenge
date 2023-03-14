import { useGameStateContext } from '../../context/Context';
import styling from './Points.module.css';

export const Points = () => {
  const { points, pointsMultiplier } = useGameStateContext();
  return (
    <div className={styling.pointsSection}>
      <div className={styling.currentPointsSection}>
        <div className={styling.currentPointsTitle}>Points</div>
        <div className={styling.currentPointsCounter}>{points * pointsMultiplier}</div>
      </div>
      <div className={styling.leaderboardSection}>
        <div className={styling.leaderboardTitle}>Leaderboard</div>
        <div className={styling.leaderboard}></div>
      </div>
    </div>
  );
};
