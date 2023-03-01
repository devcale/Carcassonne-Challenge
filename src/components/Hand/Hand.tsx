import './Hand.css';

import { useGameStateContext } from '../../helper/Context';
import { PlayableTile } from '../PlayableTile/PlayableTile';

type cityCounters = [number, number, number];
// Returns a random tile, its image, and the updated the counters
export const getRandomTile = (
  abbeyCountdown: number,
  cityCountdown: cityCounters,
): {
  newTile: string;
  newImage: string;
  newVariation: number;
  updatedAbbeyCountdown: number;
  updatedCityCountdown: cityCounters;
} => {
  const rand = Math.random();
  let newCard = 'invalid';
  let newImage = '';
  const newVariation = Math.floor(Math.random() * 3);
  let updatedAbbeyCountdown = abbeyCountdown;
  let updatedCityCountdown: cityCounters = [
    cityCountdown[0],
    cityCountdown[1],
    cityCountdown[2],
  ];

  if (
    (abbeyCountdown > 2 && cityCountdown[0] > 1) ||
    (abbeyCountdown > 1 && cityCountdown[0] > 2)
  ) {
    if (rand > 0.4) {
      newCard = 'road';
      newImage = 'src/assets/images/road-f.png';
      updatedAbbeyCountdown = abbeyCountdown - 1;
      const newCityCountdown: cityCounters = [
        cityCountdown[0] - 1,
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
      ];
      updatedCityCountdown = newCityCountdown;
    } else if (rand < 0.4 && rand >= 0.1) {
      newCard = 'city';
      newImage = 'src/assets/images/city-a.png';
      updatedAbbeyCountdown = abbeyCountdown - 1;
      const newCityCountdown: cityCounters = [
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
        15,
      ];
      updatedCityCountdown = newCityCountdown;
    } else if (rand < 0.1) {
      newCard = 'abbey';
      newImage = 'src/assets/images/abbey2-a.png';
      updatedAbbeyCountdown = 15;
      const newCityCountdown: cityCounters = [
        cityCountdown[0] - 1,
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
      ];
      updatedCityCountdown = newCityCountdown;
    }
  } else if (abbeyCountdown === 1) {
    newCard = 'abbey';
    newImage = 'src/assets/images/abbey2-a.png';
    updatedAbbeyCountdown = 15;
    const newCityCountdown: cityCounters = [
      cityCountdown[0] - 1,
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
    ];
    updatedCityCountdown = newCityCountdown;
  } else {
    newCard = 'city';
    newImage = 'src/assets/images/city-a.png';
    updatedAbbeyCountdown = abbeyCountdown - 1;
    const newCityCountdown: cityCounters = [
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
      15,
    ];
    updatedCityCountdown = newCityCountdown;
  }
  return {
    newTile: newCard,
    newImage: newImage,
    newVariation: newVariation,
    updatedAbbeyCountdown: updatedAbbeyCountdown,
    updatedCityCountdown: updatedCityCountdown,
  };
};

export const Hand = () => {
  const { hand } = useGameStateContext();

  function configureDescription(type: string): string {
    let desc = '';
    if (type === 'city') {
      desc =
        'Cities gives you two points per tile, and an extra point for each city chain.';
    } else if (type === 'abbey') {
      desc = 'Abbeys give you one point for each tile that surrounds it.';
    } else if (type === 'road') {
      desc = 'Roads give you one point per tile.';
    }
    return desc;
  }
  console.log(hand);

  return (
    <div className="hand">
      <PlayableTile
        type={hand[0][0]}
        variation={hand[0][1]}
        handIndex={0}
        description={configureDescription(hand[0][0])}
      />
      <PlayableTile
        type={hand[1][0]}
        handIndex={1}
        variation={hand[1][1]}
        description={configureDescription(hand[1][0])}
      />
      <PlayableTile
        type={hand[2][0]}
        handIndex={2}
        variation={hand[2][1]}
        description={configureDescription(hand[2][0])}
      />
      <PlayableTile
        type={hand[3][0]}
        handIndex={3}
        variation={hand[3][1]}
        description={configureDescription(hand[3][0])}
      />
    </div>
  );
};
