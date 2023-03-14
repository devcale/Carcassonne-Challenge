import { Link } from 'react-router-dom';

import styling from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <div className={styling.mainContainer}>
      <div className={styling.titleLanding}>Carcassonne Challenge</div>
      <div className={styling.optionsContainer}>
        <Link to="/Carcassonne-Challenge/gamemode">
          <div className={styling.uiButton + ' ' + styling.mainButton}>Play Game</div>
        </Link>

        <div className={styling.otherButtonsContainer}>
          <Link to="/Carcassonne-Challenge/howtoplay">
            <div className={styling.uiButton + ' ' + styling.minorButton}>
              How to Play
            </div>
          </Link>

          <Link to="/Carcassonne-Challenge/settings">
            <div className={styling.uiButton + ' ' + styling.minorButton}>Settings</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
