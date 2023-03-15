import { useState } from 'react';
import { Link } from 'react-router-dom';

import Board from '../../components/Board/Board';
import { useGameStateContext } from '../../context/Context';
import styling from './SelectModePage.module.css';
type cellType = { type: string; variant: number };
export const SelectModePage = () => {
  const { setMapGlobal, setGameMode } = useGameStateContext();
  const [selectedMode, setSelectedMode] = useState('classic'); // Manages UI Update
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

    setMapGlobal(newBoard);
  }

  function isSelected(localOption: string): string {
    let mode = 'unselectedMode';
    if (localOption === selectedMode) {
      mode = 'selectedMode';
    }
    return mode;
  }

  function isSizeSelected(localOption: string): string {
    let size = 'unselectedSize';
    if (localOption === selectedSize) {
      size = 'selectedSize';
    }
    return size;
  }

  function handleClick(optionType: string, option: string) {
    if (optionType === 'mode') {
      if (option === 'classic') {
        setSelectedMode('classic');
        setGameMode('classic');
      } else if (option === 'road') {
        setGameMode('road');
        setSelectedMode('road');
      } else if (option === 'city') {
        setGameMode('city');
        setSelectedMode('city');
      } else if (option === 'abbey') {
        setGameMode('abbey');
        setSelectedMode('abbey');
      }
    }
    if (optionType === 'size') {
      if (option === 'small') {
        updateMapValues(5);
        setSelectedSize('small');
      } else if (option === 'classic') {
        updateMapValues(11);
        setSelectedSize('classic');
      } else if (option === 'large') {
        updateMapValues(17);
        setSelectedSize('large');
      }
    }
  }
  function handleKeyDown() {
    //
  }
  return (
    <>
      <div className={styling.selectModeImageContainer}>
        <img
          className={styling.selectModeImage}
          src="src\assets\images\ui\knight.jpg"
          alt="A medieval city"
        ></img>
      </div>
      <div className={styling.gameModeContainer}>
        <div className={styling.dealingModeContainer + ' ' + styling.background}>
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
                  <div
                    className={styling.dealingModeImage + ' ' + styling.classicModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Classic <br /> Challenge
                  </div>
                  <div className={styling.dealingModeDescription}>
                    The classic game rules. Get the highest score possible!
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
                  <div
                    className={styling.dealingModeImage + ' ' + styling.roadModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Road <br />
                    Rally
                  </div>
                  <div className={styling.dealingModeDescription}>
                    The roads that wind through our lands now bear differing paths and
                    directions, requiring alignment to be joined.
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
                  <div
                    className={styling.dealingModeImage + ' ' + styling.cityModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    City <br />
                    Craze
                  </div>
                  <div className={styling.dealingModeDescription}>
                    Build mighty cities! <br />
                    <br />
                    Cities will now have to be aligned by their walls.
                    <br /> Abbeys may not be placed adjacent to other abbeys.
                    <br />
                    Greater cities bring greater glory and riches to thee!
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
                  <div
                    className={styling.dealingModeImage + ' ' + styling.abbeyModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Abbeys <br />
                    Ablaze
                  </div>
                  <div className={styling.dealingModeDescription}>
                    Beware, noble players!
                    <br />
                    <br />
                    Abbeys now burn bright and are more common in the draw pile.
                    <br />
                    <br />
                    But placing tiles near them shall reduce your points, as the flames of
                    destruction threaten to spread.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styling.boardSizeContainer + ' ' + styling.background}>
          <div className={styling.boardSizeOptions}>
            <form className={styling.boardSizeOptionsForm}>
              <div
                className={
                  styling.boardSizeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable +
                  ' ' +
                  styling[isSizeSelected('small')]
                }
                role="button"
                onClick={() => handleClick('size', 'small')}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                <div className={styling.boardSizeImageContainer}>
                  <div
                    className={styling.boardSizeImage + ' ' + styling.smallSizeImage}
                  ></div>
                </div>
                <div className={styling.boardSizeTitle}>Small</div>
              </div>
              <div
                className={
                  styling.boardSizeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable +
                  ' ' +
                  styling[isSizeSelected('classic')]
                }
                role="button"
                onClick={() => handleClick('size', 'classic')}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                <div className={styling.boardSizeImageContainer}>
                  <div
                    className={styling.boardSizeImage + ' ' + styling.classicSizeImage}
                  ></div>
                </div>
                <div className={styling.boardSizeTitle}>Classic</div>
              </div>
              <div
                className={
                  styling.boardSizeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable +
                  ' ' +
                  styling[isSizeSelected('large')]
                }
                role="button"
                onClick={() => handleClick('size', 'large')}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                <div className={styling.boardSizeImageContainer}>
                  <div
                    className={styling.boardSizeImage + ' ' + styling.largeSizeImage}
                  ></div>
                </div>
                <div className={styling.boardSizeTitle}>Large</div>
              </div>
            </form>
          </div>
        </div>
        <Link to="/Carcassonne-Challenge/play">
          <div className={styling.playButton + ' ' + styling.interactable}>
            Start Game
          </div>
        </Link>
        <div id="parchment"></div>
      </div>
    </>
  );
};
