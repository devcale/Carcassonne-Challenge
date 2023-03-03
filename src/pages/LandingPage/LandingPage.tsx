import { Link } from 'react-router-dom';

import styling from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <div className={styling.mainContainer}>
      <div className={styling.titleLanding}>Carcassonne Challenge</div>
      <Link to="/Carcassonne-Challenge/play">
        <div className={styling.uiButton}>Play Game</div>
      </Link>

      <Link to="/Carcassonne-Challenge/howtoplay">
        <div className={styling.uiButton}>How to Play</div>
      </Link>
    </div>
  );
};
