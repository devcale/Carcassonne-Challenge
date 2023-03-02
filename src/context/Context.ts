import { createContext, useContext } from 'react';

import Board from '../components/Board/Board';
import Cell from '../components/Cell/Cell';

export type GameState = {
  // Used to simbolize the index of tile that the player has selected in his hand
  // 0 <= currentTile < 5
  currentTile: number;
  setCurrentTile: (handIndex: number) => void;

  //The current number of points a player has
  // points > 0
  points: number;
  setPoints: (points: number) => void;

  // Represents the tiles the player currently has in their hand.
  // Each tile comes with a variation between 0, 1 and 2
  // Variations are used to show different images of the same tile type
  // i.e. [['road', 0], ['road', 2], ['city', 1], ['abbey', 1]]
  hand: [[string, number], [string, number], [string, number], [string, number]];
  setHand: (
    newHand: [[string, number], [string, number], [string, number], [string, number]],
  ) => void;

  // Used to represent 15 minus the amount of turns that have elapsed since the player got his last abbey.
  // No 15 turns can happen without the game dealing an abbey to the player.
  abbeyCountdown: number;
  setAbbeyCountdown: (abbeyCountdown: number) => void;

  // Used to represent 15 minus each amount of turns that have elapsed since the player got each of his last cities.
  // No 15 turns can happen without the game dealing at least 3 cities to the player.
  cityCountdown: [number, number, number];
  setCityCountdown: (cityCountdown: [number, number, number]) => void;

  // Used to represent each amount of turns left until the player gets his next discard.
  // Players get their discard every 5 turns.
  discardCountdown: number;
  setDiscardCountdown: (discardCountdown: number) => void;

  mapGlobal: string[][];
  setMapGlobal: (mapGlobal: string[][]) => void;
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
  hand: [
    ['road', 0],
    ['city', 0],
    ['abbey', 0],
    ['road', 0],
  ],
  setHand: (
    newHand: [[string, number], [string, number], [string, number], [string, number]],
  ) => {
    //
  },

  abbeyCountdown: 15,
  setAbbeyCountdown: (newAbbeyCountdown: number) => {
    //
  },
  cityCountdown: [15, 15, 15],
  setCityCountdown: (newCityCountdown: [number, number, number]) => {
    //
  },
  discardCountdown: 15,
  setDiscardCountdown: (newDiscardCountdown: number) => {
    //
  },
  mapGlobal: [[]],
  setMapGlobal: (newMapGlobal: string[][]) => {
    //
  },
});

export const useGameStateContext = () => useContext(GameStateContext);
