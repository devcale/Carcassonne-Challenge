import './PlayGame.css';

import { useEffect, useState } from 'react';

import abbeyImg1 from '../../assets/images/abbey2-a.png';
import cityImg1 from '../../assets/images/city-a.png';
import roadImg1 from '../../assets/images/road-f.png';
import { GameStateContext } from '../../helper/Context';
import Board from '../Board/Board';
import Cell from '../Cell/Cell';
import { Hand } from '../Hand/Hand';
import { Points } from '../Points/Points';

export const PlayGame = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [middle, setMiddle] = useState(Math.floor(boardSize / 2));
  const [currentTile, setCurrentTile] = useState<number>(0);
  const [points, setPoints] = useState(0);
  const [hand, setHand] = useState<[string, string, string, string]>([
    'road',
    'road',
    'city',
    'abbey',
  ]);
  const [handImages, setHandImages] = useState<[string, string, string, string]>([
    'src/assets/images/road-f.png',
    'src/assets/images/road-f.png',
    'src/assets/images/city-a.png',
    'src/assets/images/abbey2-a.png',
  ]);

  const board = new Board(boardSize, boardSize, () => <Cell altitude={0} latitude={0} />);

  useEffect(() => {
    setMiddle(Math.floor(boardSize / 2));
  }, []);

  function getCellHeight() {
    const newCellHeight = `${100 / boardSize}%`;
    return newCellHeight;
  }

  function getColWidth() {
    const newColWidth = `${100 / boardSize}%`;
    return newColWidth;
  }

  function getRandomImage(): string {
    let imgSrc = cityImg1;
    const tileType = hand[currentTile];
    if (tileType === 'city') {
      imgSrc = cityImg1;
    } else if (tileType === 'road') {
      imgSrc = roadImg1;
    } else if (tileType === 'abbey') {
      imgSrc = abbeyImg1;
    }
    return imgSrc;
  }
  return (
    <GameStateContext.Provider
      value={{
        currentTile,
        setCurrentTile,
        points,
        setPoints,
        hand,
        setHand,
        handImages,
        setHandImages,
      }}
    >
      <div className="playgame">
        <div className="title">Carcassonne Challenge</div>
        <div className="play-area">
          <div className="hand-container">
            <Hand />
          </div>

          <div className="board-container">
            <div className="board">
              {board.getBoard().map((col, colIndex) => (
                <div
                  className="board-col"
                  id={'col-' + colIndex}
                  key={'col-' + colIndex}
                  style={{ width: getColWidth() }}
                >
                  {col.map((_, cellIndex) => {
                    let defaultType = 'inactive';
                    if (colIndex === middle && cellIndex === middle) {
                      defaultType = 'init';
                    }
                    const cell = (
                      <Cell
                        altitude={cellIndex}
                        latitude={colIndex}
                        boardDimension={boardSize}
                        cellHeight={getCellHeight()}
                        tileSrc={getRandomImage()}
                        type={defaultType}
                        key={'cell-' + colIndex + '-' + cellIndex}
                      />
                    );
                    board.setInBoard(colIndex, cellIndex, cell);
                    return cell;
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="points-container">
            <Points />
          </div>
        </div>
      </div>
    </GameStateContext.Provider>
  );
};
