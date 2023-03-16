import { Link } from 'react-router-dom';

import styling from './LandingPage.module.css';

export const LandingPage = () => {
  return (
    <>
      <div className={styling.mainImageContainer}>
        <img
          className={styling.mainImage}
          src="src\assets\images\ui\city-land.png"
          alt="A medieval city"
        ></img>
      </div>

      <div className={styling.mainImageContainer2}>
        <img
          className={styling.mainImage2}
          src="src\assets\images\ui\city-land.png"
          alt="A medieval city"
        ></img>
      </div>

      <div className={styling.mainContainer}>
        <div className={styling.titleContainer}>
          <div className={styling.titleLanding}>Carcassonne</div>
          <div className={styling.titleLanding}>Challenge</div>
        </div>

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
    </>
  );
};
