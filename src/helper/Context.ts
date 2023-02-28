import { createContext, useContext } from 'react';

export type GameState = {
  currentTile: number;
  setCurrentTile: (handIndex: number) => void;
  points: number;
  setPoints: (points: number) => void;
  hand: [string, string, string, string];
  setHand: (newHand: [string, string, string, string]) => void;
  handImages: [string, string, string, string];
  setHandImages: (newHandImages: [string, string, string, string]) => void;
};

export const GameStateContext: React.Context<GameState> = createContext<GameState>({
  currentTile: 0,
  setCurrentTile: (newTile: number) => {
    //
  },
  points: 0,
  setPoints: (newPoints: number) => {
    //
  },
  hand: ['road', 'road', 'city', 'abbey'],
  setHand: (newHand: [string, string, string, string]) => {
    //
  },
  handImages: [
    'src/assets/images/road-f.png',
    'src/assets/images/road-f.png',
    'src/assets/images/city-a.png',
    'src/assets/images/abbey2-a.png',
  ],
  setHandImages: (newHandImages: [string, string, string, string]) => {
    //
  },
});

export const useGameStateContext = () => useContext(GameStateContext);
