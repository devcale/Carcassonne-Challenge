import { createContext, useContext } from 'react';

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
  // i.e. ['road', 'road', 'city', 'abbey']
  hand: [[string, number], [string, number], [string, number], [string, number]];
  setHand: (
    newHand: [[string, number], [string, number], [string, number], [string, number]],
  ) => void;

  // Used to represent the amount of turns that have elapsed since the player got his last abbey.
  // No 15 turns can happen without the game dealing an abbey to the player.
  abbeyCountdown: number;
  setAbbeyCountdown: (abbeyCountdown: number) => void;

  // Used to represent each amount of turns that have elapsed since the player got each of his last cities.
  // No 15 turns can happen without the game dealing at least 3 cities to the player.
  cityCountdown: [number, number, number];
  setCityCountdown: (cityCountdown: [number, number, number]) => void;

  discardCountdown: number;
  setDiscardCountdown: (discardCountdown: number) => void;
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
});

export const useGameStateContext = () => useContext(GameStateContext);
