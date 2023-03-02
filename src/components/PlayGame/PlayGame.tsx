import './PlayGame.css';

import { useEffect, useState } from 'react';

import { GameStateContext } from '../../helper/Context';
import Board from '../Board/Board';
import Cell from '../Cell/Cell';
import { Discard } from '../Discard/Discard';
import { Hand } from '../Hand/Hand';
import { Points } from '../Points/Points';

export const PlayGame = () => {
  type handType = [
    [string, number],
    [string, number],
    [string, number],
    [string, number],
  ];
  const [boardSize, setBoardSize] = useState(5);
  const [middle, setMiddle] = useState(Math.floor(boardSize / 2));
  const [currentTile, setCurrentTile] = useState<number>(0);
  const [points, setPoints] = useState(0);
  const [hand, setHand] = useState<handType>([
    [getRandomType(), 0],
    [getRandomType(), 0],
    [getRandomType(), 0],
    [getRandomType(), 0],
  ]);

  const [abbeyCountdown, setAbbeyCountdown] = useState<number>(15);
  const [cityCountdown, setCityCountdown] = useState<[number, number, number]>([
    12, 13, 14,
  ]);
  const [discardCountdown, setDiscardCountdown] = useState<number>(5);

  // const [board, setBoard] = useState(new Board(boardSize, boardSize, () => 'inactive'));

  const board = new Board(
    boardSize,
    boardSize,
    () => 'inactive',
    () => 'init',
  );

  const [mapGlobal, setMapGlobal] = useState<string[][]>(board.getBoard());

  function getCellHeight() {
    const newCellHeight = `${100 / boardSize}%`;
    return newCellHeight;
  }

  function getColWidth() {
    const newColWidth = `${100 / boardSize}%`;
    return newColWidth;
  }

  function getRandomType(): string {
    const types = ['city', 'road', 'abbey'];
    const rand = Math.floor(Math.random() * 3);
    return types[rand];
  }

  useEffect(() => {
    setMiddle(Math.floor(boardSize / 2));
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        currentTile,
        setCurrentTile,
        points,
        setPoints,
        hand,
        setHand,
        abbeyCountdown,
        setAbbeyCountdown,
        cityCountdown,
        setCityCountdown,
        discardCountdown,
        setDiscardCountdown,
        mapGlobal,
        setMapGlobal,
      }}
    >
      <div className="playgame">
        <div className="title">Carcassonne Challenge</div>
        <div className="play-area">
          <div className="hand-container">
            <Hand />
            <Discard />
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
                        type={defaultType}
                        key={'cell-' + colIndex + '-' + cellIndex}
                      />
                    );
                    board.setInBoard(defaultType, colIndex, cellIndex);
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
