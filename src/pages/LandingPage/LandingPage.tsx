import './LandingPage.css';

import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="title-landing">Carcassonne Challenge</div>
      <Link to="/Carcassonne-Challenge/play">
        <div className="ui-button">Play Game</div>
      </Link>

      <Link to="/Carcassonne-Challenge/howtoplay">
        <div className="ui-button">How to Play</div>
      </Link>
    </div>
  );
};
