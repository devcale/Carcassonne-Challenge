import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../context/Context';
import { DealNewTile } from '../../utils/TileDealingUtils';
import Board from '../Board/Board';
import styling from './Cell.module.css';

const Cell = (props: {
  type: string;
  variant: number;
  altitude: number;
  latitude: number;
  boardDimension: number;
  cellHeight: string;
}) => {
  const [type, setType] = useState('inactive');
  const [backgroundImage, setBackgroundImage] = useState(
    props.type === 'init' ? 'init-classic' : '',
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
    gameMode,
    setGameHasEnded,
    debugMode,
  } = useGameStateContext();

  const boardHelper = new Board(0, { type: '', variant: 0 }, { type: '', variant: 0 });

  const tabIndexNum = 6 + props.altitude * props.boardDimension + props.latitude;

  function handleClick() {
    if (type === 'inactive') {
      const placedTile = boardHelper.placeTile(
        { type: hand[currentTile][0], variant: hand[currentTile][1] },
        props.latitude,
        props.altitude,
        mapGlobal,
        gameMode,
      );
      if (placedTile.isValid) {
        setType(hand[currentTile][0]);
        setPoints(points + placedTile.pointsGained);

        setDiscardCountdown(
          discardCountdown > 0 ? discardCountdown - 1 : discardCountdown,
        );
        updateHand();
      }
    }
  }

  function handleKeyDown() {
    //
  }

  function handleMouseOver() {
    if (type === 'inactive') {
      const images = {
        city: [
          'city-0',
          'city-1',
          'city-2',
          'city-3',
          'city-4',
          'city-5',
          'city-6',
          'city-7',
          'city-8',
          'city-9',
          'city-10',
          'city-11',
          'city-12',
          'city-13',
          'city-14',
          'city-15',
          'city-16',
          'city-17',
        ],
        road: [
          'road-0',
          'road-1',
          'road-2',
          'road-3',
          'road-4',
          'road-5',
          'road-6',
          'road-7',
          'road-8',
          'road-9',
          'road-10',
          'road-11',
          'road-12',
          'road-13',
        ],
        abbey: [
          'abbey-0',
          'abbey-1',
          'abbey-2',
          'abbey-3',
          'abbey-4',
          'abbey-5',
          'abbey-6',
          'abbey-7',
          'abbey-8',
        ],
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

  function updateHand() {
    const nextState = DealNewTile(abbeyCountdown, cityCountdown, gameMode);

    const newHand: [
      [string, number],
      [string, number],
      [string, number],
      [string, number],
    ] = [...hand];

    newHand[currentTile][0] = nextState.tile.type;
    newHand[currentTile][1] = nextState.tile.variant;
    setAbbeyCountdown(nextState.updatedAbbeyCountdown);
    setCityCountdown(nextState.updatedCityCountdown);
    setHand(newHand);

    const mapParam = [];
    for (let i = 0; i < mapGlobal.length; i++) {
      const col = [];
      for (let j = 0; j < mapGlobal[i].length; j++) {
        col.push(mapGlobal[i][j]);
      }
      mapParam.push(col);
    }

    //Check if game has ended
    if (boardHelper.checkGameEnd(newHand, mapParam, discardCountdown, gameMode)) {
      setGameHasEnded(true);
      console.log('Game has ended');
    }
  }

  // Sets the type of each cell on load
  useEffect(() => {
    setType(props.type);
    if (gameMode === 'road' && props.type === 'init') {
      setBackgroundImage('init-road');
    } else if (gameMode === 'city' && props.type === 'init') {
      setBackgroundImage('init-city');
    }
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
    >
      {debugMode ? props.latitude + '-' + props.altitude : ''}
    </div>
  );
};
export default Cell;
