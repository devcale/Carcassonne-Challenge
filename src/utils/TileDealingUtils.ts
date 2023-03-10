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
  let newTile = { type: 'invalid', variant: -1 };

  let updatedAbbeyCountdown = abbeyCountdown;
  let updatedCityCountdown: CityCounters = [
    cityCountdown[0],
    cityCountdown[1],
    cityCountdown[2],
  ];

  if (
    (abbeyCountdown > 2 && cityCountdown[0] > 1) ||
    (abbeyCountdown > 1 && cityCountdown[0] > 2)
  ) {
    if (rand > 0.4) {
      newTile = {
        type: 'road',
        variant:
          gameMode === 'road'
            ? Math.floor(Math.random() * 11)
            : Math.floor(Math.random() * 3) + 11,
      };
      updatedAbbeyCountdown = abbeyCountdown - 1;
      const newCityCountdown: CityCounters = [
        cityCountdown[0] - 1,
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
      ];
      updatedCityCountdown = newCityCountdown;
    } else if (rand < 0.4 && rand >= 0.1) {
      newTile = {
        type: 'city',
        variant:
          gameMode === 'city'
            ? Math.floor(Math.random() * 18)
            : Math.floor(Math.random() * 4) + 18,
      };
      updatedAbbeyCountdown = abbeyCountdown - 1;
      const newCityCountdown: CityCounters = [
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
        15,
      ];
      updatedCityCountdown = newCityCountdown;
    } else if (rand < 0.1) {
      newTile = {
        type: 'abbey',
        variant: Math.floor(Math.random() * 3),
      };
      updatedAbbeyCountdown = 15;
      const newCityCountdown: CityCounters = [
        cityCountdown[0] - 1,
        cityCountdown[1] - 1,
        cityCountdown[2] - 1,
      ];
      updatedCityCountdown = newCityCountdown;
    }
  } else if (abbeyCountdown === 1) {
    newTile = {
      type: 'abbey',
      variant: Math.floor(Math.random() * 3),
    };
    updatedAbbeyCountdown = 15;
    const newCityCountdown: CityCounters = [
      cityCountdown[0] - 1,
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
    ];
    updatedCityCountdown = newCityCountdown;
  } else {
    newTile = {
      type: 'city',
      variant:
        gameMode === 'city'
          ? Math.floor(Math.random() * 18)
          : Math.floor(Math.random() * 4) + 18,
    };
    updatedAbbeyCountdown = abbeyCountdown - 1;
    const newCityCountdown: CityCounters = [
      cityCountdown[1] - 1,
      cityCountdown[2] - 1,
      15,
    ];
    updatedCityCountdown = newCityCountdown;
  }
  return {
    tile: newTile,
    updatedAbbeyCountdown: updatedAbbeyCountdown,
    updatedCityCountdown: updatedCityCountdown,
  };
}
