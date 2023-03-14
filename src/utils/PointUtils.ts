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
      pointsGained += 2;
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

      if (cityChain.length === 2) {
        pointsGained += 2;
      } else if (cityChain.length > 2) {
        pointsGained += 1;
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
  } else if (gameMode === 'abbey') {
    const validTiles = ['init', 'city', 'road', 'abbey'];
    const burningAbbeys: number[] = [6, 7, 8];
    const abbeyValue = burningAbbeys.includes(cell.variant) ? -1 : 1;

    if (cell.type === 'road') {
      pointsGained += 1;
    } else if (cell.type === 'city') {
      pointsGained += 2;
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

      if (cityChain.length === 2) {
        pointsGained += 2;
      } else if (cityChain.length > 2) {
        pointsGained += 1;
      }
    } else if (cell.type === 'abbey') {
      if (validTiles.includes(topRightCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(topLeftCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(bottomRightCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(bottomLeftCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(rightCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(leftCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(upperCell.type)) {
        pointsGained += abbeyValue;
      }
      if (validTiles.includes(lowerCell.type)) {
        pointsGained += abbeyValue;
      }
    }
    if (topRightCell.type === 'abbey') {
      if (burningAbbeys.includes(topRightCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (topLeftCell.type === 'abbey') {
      if (burningAbbeys.includes(topLeftCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (bottomRightCell.type === 'abbey') {
      if (burningAbbeys.includes(bottomRightCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (bottomLeftCell.type === 'abbey') {
      if (burningAbbeys.includes(bottomLeftCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (upperCell.type === 'abbey') {
      if (burningAbbeys.includes(upperCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (rightCell.type === 'abbey') {
      if (burningAbbeys.includes(rightCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (lowerCell.type === 'abbey') {
      if (burningAbbeys.includes(lowerCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
    if (leftCell.type === 'abbey') {
      if (burningAbbeys.includes(leftCell.variant)) {
        pointsGained -= 1;
      } else {
        pointsGained += 1;
      }
    }
  }

  return pointsGained;
}
