import React from 'react';

import { useGameStateContext } from '../../context/Context';
import styling from './SettingsPage.module.css';

export const SettingsPage = () => {
  const { pointsMultiplier, setPointsMultiplier, debugMode, setDebugMode } =
    useGameStateContext();
  function handleClick() {
    if (pointsMultiplier === 100) {
      setPointsMultiplier(1);
    } else {
      setPointsMultiplier(100);
    }
  }
  function handleKeyDown() {
    //
  }
  return (
    <div className={styling.settingsContainer}>
      <div className={styling.settingOptionsContainer}>
        <div className={styling.option}>
          <div className={styling.optionName}>Points Multiplier</div>
          <div
            className={styling.optionButton}
            role="button"
            onClick={() => handleClick()}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            x{pointsMultiplier}
          </div>
        </div>
        <div className={styling.option}>
          <div className={styling.optionName}>Debug Mode</div>
          <div
            className={styling.optionButton}
            role="button"
            onClick={() => setDebugMode(!debugMode)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {debugMode ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>
    </div>
  );
};
