import './Cell.css';

import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../helper/Context';
import Board from '../Board/Board';
import { getRandomTile } from '../Hand/Hand';

const Cell = (props: any) => {
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
  } = useGameStateContext();

  const boardHelper = new Board(
    0,
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
        city: [
          'src/assets/images/city-a.png',
          'src/assets/images/city-b.png',
          'src/assets/images/city-c.png',
          'src/assets/images/city-d.png',
        ],
        road: [
          'src/assets/images/road-a.png',
          'src/assets/images/road-b.png',
          'src/assets/images/road-c.png',
        ],
        abbey: [
          'src/assets/images/abbey-a.png',
          'src/assets/images/abbey-b.png',
          'src/assets/images/abbey-c.png',
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
      setBackgroundImage('');
    }
  }

  function handleFocus() {
    //
  }

  function handleBlur() {
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
  }

  // Sets the type of each cell on load
  useEffect(() => {
    setType(props.type);
  }, []);

  return (
    <div
      className={'cell ' + type}
      id={'cell-' + props.latitude + '-' + props.altitude}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="button"
      tabIndex={tabIndexNum}
      style={{ height: props.cellHeight, backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};
export default Cell;
