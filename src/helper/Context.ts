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
  hand: [string, string, string, string];
  setHand: (newHand: [string, string, string, string]) => void;

  // Represents the images of the tiles the player currently has in their hand.
  handImages: [string, string, string, string];
  setHandImages: (newHandImages: [string, string, string, string]) => void;

  // Used to represent the amount of turns that have elapsed since the player got his last abbey.
  // No 15 turns can happen without the game dealing an abbey to the player.
  abbeyCountdown: number;
  setAbbeyCountdown: (abbeyCountdown: number) => void;

  // Used to represent each amount of turns that have elapsed since the player got each of his last cities.
  // No 15 turns can happen without the game dealing at least 3 cities to the player.
  cityCountdown: [number, number, number];
  setCityCountdown: (cityCountdown: [number, number, number]) => void;
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
  abbeyCountdown: 15,
  setAbbeyCountdown: (newAbbeyCountdown: number) => {
    //
  },
  cityCountdown: [15, 15, 15],
  setCityCountdown: (newCityCountdown: [number, number, number]) => {
    //
  },
});

export const useGameStateContext = () => useContext(GameStateContext);
