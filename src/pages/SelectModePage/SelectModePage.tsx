import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import abbeysAblaze from '../../assets/images/abbeys-ablaze.png';
import cityCraze from '../../assets/images/city-craze.png';
import classicCarca from '../../assets/images/classic-carcassonne.png';
import roadRally from '../../assets/images/road-rally.png';
import Board from '../../components/Board/Board';
import { useGameStateContext } from '../../context/Context';
import styling from './SelectModePage.module.css';
type cellType = { type: string; variant: number };
export const SelectModePage = () => {
  const { mapGlobal, setMapGlobal } = useGameStateContext();
  const [selectedMode, setSelectedMode] = useState('classic');
  const [selectedSize, setSelectedSize] = useState('classic');

  function mapDuplication(mapToChange: cellType[][]): cellType[][] {
    const mapInit: cellType[][] = mapToChange.map((subArr) => subArr.slice());
    return mapInit;
  }

  function updateMapValues(size: number): void {
    const board = new Board(
      size,
      {
        type: 'inactive',
        variant: 0,
      },
      {
        type: 'init',
        variant: 0,
      },
    );
    const newBoard = mapDuplication(board.getBoard());
    console.log('Board created: ');
    console.log(newBoard);
    setMapGlobal(newBoard);
    console.log('Board updated: ');
    console.log(mapGlobal);
  }

  function isSelected(localOption: string): string {
    let mode = 'unselectedMode';
    if (localOption === selectedMode) {
      mode = 'selectedMode';
    }
    return mode;
  }

  function handleClick(optionType: string, option: string) {
    if (optionType === 'mode') {
      if (option === 'classic') {
        console.log('enters classic mode');
        setSelectedMode('classic');
      } else if (option === 'road') {
        console.log('enters road mode');
        setSelectedMode('road');
      } else if (option === 'city') {
        console.log('enters city mode');
        setSelectedMode('city');
      } else if (option === 'abbey') {
        console.log('enters abbey mode');
        setSelectedMode('abbey');
      }
    }
    if (optionType === 'size') {
      if (option === 'small') {
        console.log('enters small');
        updateMapValues(5);
      } else if (option === 'classic') {
        console.log('enters classic');
        updateMapValues(11);
      } else if (option === 'large') {
        console.log('enters large');
        updateMapValues(17);
      }
    }
  }
  function handleKeyDown() {
    //
  }
  useEffect(() => {
    console.log('Triggered refresh on select mode page');
  }, []);
  return (
    <div className={styling.gameModeContainer}>
      <div className={styling.title}>Carcassonne Challenge</div>
      <div className={styling.dealingModeContainer + ' ' + styling.background}>
        Game Mode
        <div className={styling.dealingModeOptions}>
          <form className={styling.dealingModeOptionsForm}>
            <div
              id="classic-mode"
              className={
                styling.dealingModeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable +
                ' ' +
                styling[isSelected('classic')]
              }
              role="button"
              onClick={() => handleClick('mode', 'classic')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <div className={styling.dealingModeImageContainer}>
                <img
                  className={styling.dealingModeImage}
                  src={classicCarca}
                  alt="Classic carcassonne game mode"
                />
              </div>
              <div className={styling.dealingModeInfo}>
                <div className={styling.dealingModeTitle}>
                  Classic <br /> Challenge
                </div>
                <div className={styling.dealingModeDescription}>
                  The classic game rules. Get the highest score possible and compare
                  yourself to the best to ever play
                </div>
              </div>
            </div>
            <div
              id="road-mode"
              className={
                styling.dealingModeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable +
                ' ' +
                styling[isSelected('road')]
              }
              role="button"
              onClick={() => handleClick('mode', 'road')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <div className={styling.dealingModeImageContainer}>
                <img
                  className={styling.dealingModeImage}
                  src={roadRally}
                  alt="Road rally game mode"
                />
              </div>
              <div className={styling.dealingModeInfo}>
                <div className={styling.dealingModeTitle}>
                  Road <br />
                  Rally
                </div>
                <div className={styling.dealingModeDescription}>
                  In this game mode, the player will focus on building roads and
                  connecting them to score points. Road tiles will now have different
                  directions, and you may only connect them if they line up.
                </div>
              </div>
            </div>
            <div
              id="city-mode"
              className={
                styling.dealingModeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable +
                ' ' +
                styling[isSelected('city')]
              }
              role="button"
              onClick={() => handleClick('mode', 'city')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <div className={styling.dealingModeImageContainer}>
                <img
                  className={styling.dealingModeImage}
                  src={cityCraze}
                  alt="City craze game mode"
                />
              </div>
              <div className={styling.dealingModeInfo}>
                <div className={styling.dealingModeTitle}>
                  City <br />
                  Craze
                </div>
                <div className={styling.dealingModeDescription}>
                  This game mode is focused on building cities, with a higher point value
                  for completed cities. The game will feature more city tiles in the draw
                  pile, and larger cities could be more common.
                </div>
              </div>
            </div>
            <div
              id="abbey-mode"
              className={
                styling.dealingModeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable +
                ' ' +
                styling[isSelected('abbey')]
              }
              role="button"
              onClick={() => handleClick('mode', 'abbey')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <div className={styling.dealingModeImageContainer}>
                <img
                  className={styling.dealingModeImage}
                  src={abbeysAblaze}
                  alt="Abbeys ablaze game mode"
                />
              </div>
              <div className={styling.dealingModeInfo}>
                <div className={styling.dealingModeTitle}>
                  Abbeys <br />
                  Ablaze
                </div>
                <div className={styling.dealingModeDescription}>
                  Watch out player! <br />
                  The abbeys are on fire! <br />
                  Abbeys will be more common in the draw pile, but they will now discount
                  you points for each tile besides them.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styling.boardSizeContainer + ' ' + styling.background}>
        Board Size
        <div className={styling.boardSizeOptions}>
          <form className={styling.boardSizeOptionsForm}>
            <div
              className={
                styling.boardSizeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable
              }
              role="button"
              onClick={() => handleClick('size', 'small')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              Small
            </div>
            <div
              className={
                styling.boardSizeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable
              }
              role="button"
              onClick={() => handleClick('size', 'classic')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              Classic
            </div>
            <div
              className={
                styling.boardSizeOption +
                ' ' +
                styling.backgroundOption +
                ' ' +
                styling.interactable
              }
              role="button"
              onClick={() => handleClick('size', 'large')}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              Large
            </div>
          </form>
        </div>
      </div>
      <Link to="/Carcassonne-Challenge/play">
        <div
          className={
            styling.playButton + ' ' + styling.background + ' ' + styling.interactable
          }
        >
          Play
        </div>
      </Link>
    </div>
  );
};
