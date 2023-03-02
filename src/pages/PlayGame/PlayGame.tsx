import './PlayGame.css';

import { useState } from 'react';

import Board from '../../components/Board/Board';
import { BoardComponent } from '../../components/Board/BoardComponent';
import { Discard } from '../../components/Discard/Discard';
import { Hand } from '../../components/Hand/Hand';
import { Points } from '../../components/Points/Points';
import { GameStateContext } from '../../context/Context';

export const PlayGame = () => {
  type handType = [
    [string, number],
    [string, number],
    [string, number],
    [string, number],
  ];
  const [boardSize, setBoardSize] = useState(11);
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

  const board = new Board(
    boardSize,
    () => 'inactive',
    () => 'init',
  );

  const [mapGlobal, setMapGlobal] = useState<string[][]>(board.getBoard());

  function getRandomType(): string {
    const types = ['city', 'road', 'abbey'];
    const rand = Math.floor(Math.random() * 3);
    return types[rand];
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
            <BoardComponent board={board} />
          </div>
          <div className="points-container">
            <Points />
          </div>
        </div>
      </div>
    </GameStateContext.Provider>
  );
};
