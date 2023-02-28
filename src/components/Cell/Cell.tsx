import './Cell.css';

import { useEffect, useState } from 'react';

import cityImg from '../../assets/images/city-a.png';
import { useGameStateContext } from '../../helper/Context';

const Cell = (props: any) => {
  const [type, setType] = useState('inactive');
  const [backgroundImage, setBackgroundImage] = useState(
    props.type === 'init' ? 'src/assets/images/intersection-a.png' : '',
  );
  const {
    hand,
    setHand,
    currentTile,
    handImages,
    setHandImages,
    abbeyCountdown,
    setAbbeyCountdown,
    cityCountdown,
    setCityCountdown,
  } = useGameStateContext();

  const tabIndexNum = 5 + props.altitude * props.boardDimension + props.latitude;

  function handleClick() {
    if (type === 'inactive') {
      setType(hand[currentTile]);
      dealNewCard();
    }
  }

  function handleKeyDown() {
    //
  }

  function handleMouseOver() {
    if (type === 'inactive') {
      setBackgroundImage(handImages[currentTile]);
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

  function dealNewCard() {
    const rand = Math.random();
    let newCard = 'invalid';
    let newImage = '';

    if (
      (abbeyCountdown > 2 && cityCountdown[0] > 1) ||
      (abbeyCountdown > 1 && cityCountdown[0] > 2)
    ) {
      if (rand > 0.4) {
        newCard = 'road';
        newImage = 'src/assets/images/road-f.png';
        setAbbeyCountdown(abbeyCountdown - 1);
        const newCityCountdown: [number, number, number] = [
          cityCountdown[0] - 1,
          cityCountdown[1] - 1,
          cityCountdown[2] - 1,
        ];
        setCityCountdown(newCityCountdown);
      } else if (rand < 0.4 && rand >= 0.1) {
        newCard = 'city';
        newImage = 'src/assets/images/city-a.png';
        setAbbeyCountdown(abbeyCountdown - 1);
        const newCityCountdown: [number, number, number] = [
          cityCountdown[1] - 1,
          cityCountdown[2] - 1,
          15,
        ];
        setCityCountdown(newCityCountdown);
      } else if (rand < 0.1) {
        newCard = 'abbey';
        newImage = 'src/assets/images/abbey2-a.png';
        setAbbeyCountdown(15);
        const newCityCountdown: [number, number, number] = [
          cityCountdown[0] - 1,
          cityCountdown[1] - 1,
          cityCountdown[2] - 1,
        ];
        setCityCountdown(newCityCountdown);
      }
    } else if (abbeyCountdown === 1) {
      newCard = 'abbey';
      newImage = 'src/assets/images/abbey2-a.png';
      setAbbeyCountdown(15);
      const newCityCountdown: [number, number, number] = [
        cityCountdown[0] - 1,
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
      ];
      setCityCountdown(newCityCountdown);
    } else {
      newCard = 'city';
      newImage = 'src/assets/images/city-a.png';
      setAbbeyCountdown(abbeyCountdown - 1);
      const newCityCountdown: [number, number, number] = [
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
        15,
      ];
      setCityCountdown(newCityCountdown);
    }

    const newHand: [string, string, string, string] = [...hand];
    const newImages: [string, string, string, string] = [...handImages];

    newHand[currentTile] = newCard;
    newImages[currentTile] = newImage;

    setHand(newHand);
    setHandImages(newImages);
  }

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
