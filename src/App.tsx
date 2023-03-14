import './App.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Board from './components/Board/Board';
import { GameStateContext } from './context/Context';
import useLocalStorage from './hooks/useLocalStorage';
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
  const [pointsMultiplier, setPointsMultiplier] = useState(100);
  const [hand, setHand] = useState<handType>([
    getRandomType(),
    getRandomType(),
    getRandomType(),
    getRandomType(),
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
  const [gameMode, setGameMode] = useLocalStorage<string>('mode', 'classic');
  const [gameHasEnded, setGameHasEnded] = useState<boolean>(false);

  function initMapGlobal(): cellType[][] {
    const mapInit: cellType[][] = board.getBoard().map((subArr) => subArr.slice());
    return mapInit;
  }

  function getRandomType(): [string, number] {
    const types = ['city', 'road', 'abbey'];

    const randType = Math.floor(Math.random() * 3);
    const toReturn: [string, number] = [types[randType], 0];
    if (types[randType] === 'city') {
      const randVariant = Math.floor(Math.random() * 4);
      toReturn[1] = randVariant;
    } else if (types[randType] === 'road') {
      const randVariant = Math.floor(Math.random() * 3) + 11;
      toReturn[1] = randVariant;
    } else if (types[randType] === 'abbey') {
      const randVariant = Math.floor(Math.random() * 3);
      toReturn[1] = randVariant;
    }
    return toReturn;
  }
  return (
    <GameStateContext.Provider
      value={{
        currentTile,
        setCurrentTile,
        points,
        setPoints,
        pointsMultiplier,
        setPointsMultiplier,
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
        gameMode,
        setGameMode,
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
