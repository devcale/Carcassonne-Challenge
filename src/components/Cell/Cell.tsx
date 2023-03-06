import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../context/Context';
import Board from '../Board/Board';
import { getRandomTile } from '../Hand/Hand';
import styling from './Cell.module.css';

const Cell = (props: {
  type: string;
  altitude: number;
  latitude: number;
  boardDimension: number;
  cellHeight: string;
}) => {
  const [type, setType] = useState('inactive');
  const [backgroundImage, setBackgroundImage] = useState(
    props.type === 'init' ? 'src/assets/images/intersection-a.png' : '',
  );
  const {
    hand,
    setHand,
    currentTile,
    abbeyCountdown,
    setAbbeyCountdown,
    cityCountdown,
    setCityCountdown,
    discardCountdown,
    setDiscardCountdown,
    mapGlobal,
    points,
    setPoints,
    setGameHasEnded,
  } = useGameStateContext();

  const boardHelper = new Board(
    0,
    () => '',
    () => '',
  );

  const tabIndexNum = 6 + props.altitude * props.boardDimension + props.latitude;

  function handleClick() {
    if (type === 'inactive') {
      const placedTile = boardHelper.placeTile(
        hand[currentTile][0],
        props.latitude,
        props.altitude,
        mapGlobal,
      );
      if (placedTile.isValid) {
        setType(hand[currentTile][0]);
        setPoints(points + placedTile.pointsGained);
        updateHand();
        setDiscardCountdown(
          discardCountdown > 0 ? discardCountdown - 1 : discardCountdown,
        );
      }
    }
  }

  function handleKeyDown() {
    //
  }

  function handleMouseOver() {
    if (type === 'inactive') {
      const images = {
        city: ['city-0', 'city-1', 'city-2'],
        road: ['road-0', 'road-1', 'road-2'],
        abbey: ['abbey-0', 'abbey-1', 'abbey-2'],
      };

      if (hand[currentTile][0] === 'city') {
        setBackgroundImage(images.city[hand[currentTile][1]]);
      } else if (hand[currentTile][0] === 'road') {
        setBackgroundImage(images.road[hand[currentTile][1]]);
      } else if (hand[currentTile][0] === 'abbey') {
        setBackgroundImage(images.abbey[hand[currentTile][1]]);
      }
    }
  }

  function handleMouseOut() {
    if (type === 'inactive') {
      setBackgroundImage('inactive');
    }
  }

  function handleFocus() {
    //
  }

  function handleBlur() {
    //
  }

  function endGame(): void {
    //
  }

  function updateHand() {
    const nextState = getRandomTile(abbeyCountdown, cityCountdown);

    const newHand: [
      [string, number],
      [string, number],
      [string, number],
      [string, number],
    ] = [...hand];

    newHand[currentTile][0] = nextState.newTile;
    newHand[currentTile][1] = nextState.newVariation;
    setAbbeyCountdown(nextState.updatedAbbeyCountdown);
    setCityCountdown(nextState.updatedCityCountdown);
    setHand(newHand);

    //Check if game has ended
    if (boardHelper.checkGameEnd(newHand, mapGlobal, discardCountdown)) {
      setGameHasEnded(true);
      console.log('Game has ended');
    }
  }

  // Sets the type of each cell on load
  useEffect(() => {
    setType(props.type);
  }, []);

  return (
    <div
      className={styling.cell + ' ' + styling[type] + ' ' + styling[backgroundImage]}
      id={'cell-' + props.latitude + '-' + props.altitude}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="button"
      tabIndex={tabIndexNum}
      style={{ height: props.cellHeight }}
    ></div>
  );
};
export default Cell;
