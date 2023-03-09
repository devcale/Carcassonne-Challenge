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

  return pointsGained;
}
