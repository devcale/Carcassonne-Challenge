import './App.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Board from './components/Board/Board';
import { GameStateContext } from './context/Context';
import { InstructionsPage } from './pages/InstructionsPage/InstructionsPage';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { PlayGame } from './pages/PlayGame/PlayGame';
import { SelectModePage } from './pages/SelectModePage/SelectModePage';
type cellType = { type: string; variant: number };
function App() {
  type handType = [
    [string, number],
    [string, number],
    [string, number],
    [string, number],
  ];
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
    11,
    { type: 'inactive', variant: 0 },
    { type: 'init', variant: 0 },
  );

  const [mapGlobal, setMapGlobal] = useState<cellType[][]>(initMapGlobal);
  const [gameHasEnded, setGameHasEnded] = useState<boolean>(false);

  function initMapGlobal(): cellType[][] {
    const mapInit: cellType[][] = board.getBoard().map((subArr) => subArr.slice());
    return mapInit;
  }

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
        gameHasEnded,
        setGameHasEnded,
      }}
    >
      <Routes>
        <Route path="/Carcassonne-Challenge/" element={<LandingPage />} />
        <Route path="/Carcassonne-Challenge/gamemode" element={<SelectModePage />} />
        <Route path="/Carcassonne-Challenge/play" element={<PlayGame />} />
        <Route path="/Carcassonne-Challenge/howtoplay" element={<InstructionsPage />} />
      </Routes>
    </GameStateContext.Provider>
  );
}

export default App;
