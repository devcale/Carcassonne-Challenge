type CityCounters = [number, number, number];
type Tile = { type: string; variant: number };
// Returns a random tile, its image, and the updated the counters
export function DealNewTile(
  abbeyCountdown: number,
  cityCountdown: CityCounters,
  gameMode: string,
): {
  tile: Tile;
  updatedAbbeyCountdown: number;
  updatedCityCountdown: CityCounters;
} {
  const rand = Math.random();

  let chosen = '';

  let newTile = { type: 'invalid', variant: -1 };

  let roadOdds = 0.52;
  let cityOdds = 0.4;

  if (gameMode === 'city') {
    cityOdds = 0.8;
    roadOdds = 0;
  }
  if (gameMode === 'road') {
    cityOdds = 0.2;
    roadOdds = 0.7;
  }

  let updatedAbbeyCountdown = abbeyCountdown;
  let updatedCityCountdown: CityCounters = [
    cityCountdown[0],
    cityCountdown[1],
    cityCountdown[2],
  ];

  // Given the counters for abbey and city, deal a new card pseudorandomly
  if (
    (abbeyCountdown > 2 && cityCountdown[0] > 1) ||
    (abbeyCountdown > 1 && cityCountdown[0] > 2)
  ) {
    if (rand < roadOdds) {
      chosen = 'road';
    } else if (rand >= roadOdds && rand < roadOdds + cityOdds) {
      chosen = 'city';
    } else {
      chosen = 'abbey';
    }
  } else if (abbeyCountdown === 1) {
    chosen = 'abbey';
  } else {
    chosen = 'city';
  }

  // For each type of possible card, deal a random variant and update de counters
  if (chosen === 'road') {
    let variantRand = Math.floor(Math.random() * 3) + 11;
    if (gameMode === 'road' || gameMode === 'city') {
      variantRand = Math.floor(Math.random() * 11);
    }
    newTile = {
      type: 'road',
      variant: variantRand,
    };
    updatedAbbeyCountdown = abbeyCountdown - 1;
    const newCityCountdown: CityCounters = [
      cityCountdown[0] - 1,
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
    ];
    updatedCityCountdown = newCityCountdown;
  } else if (chosen === 'city') {
    newTile = {
      type: 'city',
      variant:
        gameMode === 'city'
          ? Math.floor(Math.random() * 18)
          : Math.floor(Math.random() * 4),
    };
    updatedAbbeyCountdown = abbeyCountdown - 1;
    const newCityCountdown: CityCounters = [
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
      15,
    ];
    updatedCityCountdown = newCityCountdown;
  } else if (chosen === 'abbey') {
    newTile = {
      type: 'abbey',
      variant:
        gameMode === 'city'
          ? Math.floor(Math.random() * 3) + 3
          : Math.floor(Math.random() * 3),
    };
    updatedAbbeyCountdown = 15;
    const newCityCountdown: CityCounters = [
      cityCountdown[0] - 1,
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
    ];
    updatedCityCountdown = newCityCountdown;
  }
  return {
    tile: newTile,
    updatedAbbeyCountdown: updatedAbbeyCountdown,
    updatedCityCountdown: updatedCityCountdown,
  };
}
