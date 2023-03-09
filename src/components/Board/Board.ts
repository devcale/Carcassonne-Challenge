type cellType = { type: string; variant: number };

class Board {
  private map: cellType[][];
  private size: number;

  constructor(size: number, init: cellType, center: cellType) {
    this.map = [];
    this.size = size;
    const middle = Math.floor(size / 2);
    for (let i = 0; i < size; i++) {
      const row: cellType[] = [];
      for (let j = 0; j < size; j++) {
        if (i === middle && j === middle) {
          row.push(center);
        } else {
          row.push(init);
        }
      }
      this.map.push(row);
    }
  }

  getFromBoard(x: number, y: number): cellType {
    return this.map[x][y];
  }

  setInBoard(type: cellType, latitude: number, altitude: number): void {
    this.map[latitude][altitude] = type;
  }

  getSize() {
    return this.size;
  }

  isPlacementValid(
    cell: cellType,
    latitude: number,
    altitude: number,
    map: cellType[][],
  ): boolean {
    let isValid = false;
    const currentCell = map[latitude][altitude];
    let upperCell = { type: 'out', variant: 0 };
    let lowerCell = { type: 'out', variant: 0 };
    let rightCell = { type: 'out', variant: 0 };
    let leftCell = { type: 'out', variant: 0 };

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

    let allowedTypes: string[] = [];

    if (cell.type === 'city') {
      allowedTypes = ['city', 'abbey', 'road', 'init'];
    } else if (cell.type === 'road') {
      allowedTypes = ['road', 'init'];
    } else if (cell.type === 'abbey') {
      allowedTypes = ['city', 'abbey', 'road', 'init'];
    }

    if (
      currentCell.type === 'inactive' &&
      (allowedTypes.includes(upperCell.type) ||
        allowedTypes.includes(lowerCell.type) ||
        allowedTypes.includes(rightCell.type) ||
        allowedTypes.includes(leftCell.type))
    ) {
      isValid = true;
    }

    return isValid;
  }

  abbeyPoints(
    cell: cellType,
    latitude: number,
    altitude: number,
    map: cellType[][],
  ): number {
    let pointsGained = 0;
    let upperCell = { type: 'out', variant: 0 };
    let lowerCell = { type: 'out', variant: 0 };
    let rightCell = { type: 'out', variant: 0 };
    let leftCell = { type: 'out', variant: 0 };
    let topLeftCell = { type: 'out', variant: 0 };
    let topRightCell = { type: 'out', variant: 0 };
    let bottomRightCell = { type: 'out', variant: 0 };
    let bottomLeftCell = { type: 'out', variant: 0 };

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

    const allowedTypes = ['abbey', 'city', 'road'];
    if (cell.type === 'abbey') {
      if (allowedTypes.includes(topRightCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(topLeftCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(bottomRightCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(bottomLeftCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(rightCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(leftCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(upperCell.type)) {
        pointsGained += 1;
      }
      if (allowedTypes.includes(lowerCell.type)) {
        pointsGained += 1;
      }
    } else {
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

  checkGameEnd(
    hand: [[string, number], [string, number], [string, number], [string, number]],
    map: cellType[][],
    discardCountdown: number,
  ): boolean {
    console.log('Checking if game has ended');
    let gameHasEnded = true;
    if (discardCountdown === 0) {
      gameHasEnded = false;
    } else {
      let found = false;
      for (let i = 0; i < hand.length && !found; i++) {
        const handTile: cellType = { type: hand[i][0], variant: hand[i][1] };
        for (let j = 0; j < map.length && !found; j++) {
          for (let k = 0; k < map[j].length && !found; k++) {
            if (this.isPlacementValid(handTile, j, k, map)) {
              gameHasEnded = false;
              found = true;
            }
          }
        }
      }
    }

    console.log(gameHasEnded);
    return gameHasEnded;
  }

  // Returns a boolean-number pair
  // The boolean is used to indicate if the tile was successfully placed
  // The number is the amount of points gained
  placeTile(
    cell: cellType,
    latitude: number,
    altitude: number,
    map: cellType[][],
  ): { isValid: boolean; pointsGained: number } {
    let pointsGained = 0;
    let isValid = false;

    if (this.isPlacementValid(cell, latitude, altitude, map)) {
      pointsGained += this.abbeyPoints(cell, latitude, altitude, map);
      pointsGained += 3;
      isValid = true;
      map[latitude][altitude] = cell;
    }

    return { isValid: isValid, pointsGained: pointsGained };
  }

  getBoard(): cellType[][] {
    return this.map;
  }
}

export default Board;
