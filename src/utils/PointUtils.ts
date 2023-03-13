import { IsCityClosed, TilesInChain } from './BoardUtils';

type Tile = { type: string; variant: number };
export function GainPoints(
  cell: Tile,
  latitude: number,
  altitude: number,
  map: Tile[][],
  gameMode: string,
): number {
  let pointsGained = 0;
  let upperCell = { type: 'out', variant: -1 };
  let lowerCell = { type: 'out', variant: -1 };
  let rightCell = { type: 'out', variant: -1 };
  let leftCell = { type: 'out', variant: -1 };
  let topLeftCell = { type: 'out', variant: -1 };
  let topRightCell = { type: 'out', variant: -1 };
  let bottomRightCell = { type: 'out', variant: -1 };
  let bottomLeftCell = { type: 'out', variant: -1 };

  if (altitude - 1 >= 0) {
    upperCell = map[latitude][altitude - 1];
  }
  if (altitude + 1 < map.length) {
    lowerCell = map[latitude][altitude + 1];
  }
  if (latitude + 1 < map.length) {
    rightCell = map[latitude + 1][altitude];
  }
  if (latitude - 1 >= 0) {
    leftCell = map[latitude - 1][altitude];
  }
  if (latitude - 1 >= 0 && altitude - 1 >= 0) {
    topLeftCell = map[latitude - 1][altitude - 1];
  }
  if (latitude + 1 < map.length && altitude - 1 >= 0) {
    topRightCell = map[latitude + 1][altitude - 1];
  }
  if (latitude + 1 < map.length && altitude + 1 < map.length) {
    bottomRightCell = map[latitude + 1][altitude + 1];
  }
  if (latitude - 1 >= 0 && altitude + 1 < map.length) {
    bottomLeftCell = map[latitude - 1][altitude + 1];
  }

  if (gameMode === 'classic' || gameMode === 'road') {
    const pointAdders = ['init', 'abbey', 'city', 'road'];

    if (cell.type === 'road') {
      pointsGained += 1;
    } else if (cell.type === 'city') {
      pointsGained += 3;
    } else if (cell.type === 'abbey') {
      if (pointAdders.includes(topRightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(topLeftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(bottomRightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(bottomLeftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(rightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(leftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(upperCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(lowerCell.type)) {
        pointsGained += 1;
      }
    }
    if (topRightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (topLeftCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (bottomRightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (bottomLeftCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (upperCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (rightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (lowerCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (leftCell.type === 'abbey') {
      pointsGained += 1;
    }
  } else if (gameMode === 'city') {
    console.log('Gamemode is city');
    const pointAdders = ['init', 'abbey', 'city', 'road'];
    if (cell.type === 'city') {
      console.log('Tile placed was a city');
      const mapParam = [];
      for (let i = 0; i < map.length; i++) {
        const col = [];
        for (let j = 0; j < map[i].length; j++) {
          if (i === latitude && j === altitude) {
            col.push(cell);
          } else {
            col.push(map[i][j]);
          }
        }
        mapParam.push(col);
      }
      const cityChain = TilesInChain(cell, latitude, altitude, mapParam);

      console.log('city chain is: ');
      console.log(cityChain);
      if (IsCityClosed(cityChain, mapParam)) {
        if (cityChain.length < 5) {
          pointsGained += cityChain.length;
        } else if (cityChain.length >= 5 && cityChain.length < 10) {
          pointsGained += cityChain.length * 2;
        } else if (cityChain.length >= 10 && cityChain.length < 15) {
          pointsGained += cityChain.length * 3;
        } else if (cityChain.length >= 15) {
          pointsGained += cityChain.length * 4;
        }
      }
    } else if (cell.type === 'abbey') {
      if (pointAdders.includes(topRightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(topLeftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(bottomRightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(bottomLeftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(rightCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(leftCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(upperCell.type)) {
        pointsGained += 1;
      }
      if (pointAdders.includes(lowerCell.type)) {
        pointsGained += 1;
      }
    }
    if (topRightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (topLeftCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (bottomRightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (bottomLeftCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (upperCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (rightCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (lowerCell.type === 'abbey') {
      pointsGained += 1;
    }
    if (leftCell.type === 'abbey') {
      pointsGained += 1;
    }
  }

  return pointsGained;
}
