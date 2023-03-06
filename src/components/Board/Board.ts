class Board<A> {
  private map: A[][];
  private size: number;

  constructor(size: number, init: () => A, center: () => A) {
    this.map = [];
    this.size = size;
    const middle = Math.floor(size / 2);
    for (let i = 0; i < size; i++) {
      const row: A[] = [];
      for (let j = 0; j < size; j++) {
        if (i === middle && j === middle) {
          row.push(center());
        } else {
          row.push(init());
        }
      }
      this.map.push(row);
    }
  }

  getFromBoard(x: number, y: number): A {
    return this.map[x][y];
  }

  setInBoard(type: A, latitude: number, altitude: number): void {
    this.map[latitude][altitude] = type;
  }

  getSize() {
    return this.size;
  }

  isPlacementValid(
    type: string,
    latitude: number,
    altitude: number,
    map: string[][],
  ): boolean {
    let isValid = false;
    const currentCell = map[latitude][altitude];
    let upperCell = 'out';
    let lowerCell = 'out';
    let rightCell = 'out';
    let leftCell = 'out';

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

    let allowed: string[] = [];

    if (type === 'city') {
      allowed = ['city', 'abbey', 'road', 'init'];
    } else if (type === 'road') {
      allowed = ['road', 'init'];
    } else if (type === 'abbey') {
      allowed = ['city', 'abbey', 'road', 'init'];
    }

    if (
      currentCell === 'inactive' &&
      (allowed.includes(upperCell) ||
        allowed.includes(lowerCell) ||
        allowed.includes(rightCell) ||
        allowed.includes(leftCell))
    ) {
      isValid = true;
    }

    return isValid;
  }

  abbeyPoints(type: string, latitude: number, altitude: number, map: string[][]): number {
    let pointsGained = 0;
    let upperCell = 'out';
    let lowerCell = 'out';
    let rightCell = 'out';
    let leftCell = 'out';
    let topLeftCell = 'out';
    let topRightCell = 'out';
    let bottomRightCell = 'out';
    let bottomLeftCell = 'out';

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
    if (latitude + 1 < map.length && altitude + 1 >= 0) {
      bottomRightCell = map[latitude + 1][altitude + 1];
    }
    if (latitude - 1 >= 0 && altitude + 1 >= 0) {
      bottomLeftCell = map[latitude - 1][altitude + 1];
    }

    const allowed = ['abbey', 'city', 'road'];
    if (type === 'abbey') {
      if (allowed.includes(topRightCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(topLeftCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(bottomRightCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(bottomLeftCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(rightCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(leftCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(upperCell)) {
        pointsGained += 1;
      }
      if (allowed.includes(lowerCell)) {
        pointsGained += 1;
      }
    } else {
      if (topRightCell === 'abbey') {
        pointsGained += 1;
      }
      if (topLeftCell === 'abbey') {
        pointsGained += 1;
      }
      if (bottomRightCell === 'abbey') {
        pointsGained += 1;
      }
      if (bottomLeftCell === 'abbey') {
        pointsGained += 1;
      }
      if (upperCell === 'abbey') {
        pointsGained += 1;
      }
      if (rightCell === 'abbey') {
        pointsGained += 1;
      }
      if (lowerCell === 'abbey') {
        pointsGained += 1;
      }
      if (leftCell === 'abbey') {
        pointsGained += 1;
      }
    }
    return pointsGained;
  }

  checkGameEnd(
    hand: [[string, number], [string, number], [string, number], [string, number]],
    map: string[][],
    discardCountdown: number,
  ): boolean {
    console.log('Checking if game has ended');
    let gameHasEnded = true;
    if (discardCountdown === 0) {
      gameHasEnded = false;
    } else {
      let found = false;
      for (let i = 0; i < hand.length && !found; i++) {
        const handTileType: string = hand[i][0];
        for (let j = 0; j < map.length && !found; j++) {
          for (let k = 0; k < map[j].length && !found; k++) {
            if (this.isPlacementValid(handTileType, j, k, map)) {
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
    type: string,
    latitude: number,
    altitude: number,
    map: string[][],
  ): { isValid: boolean; pointsGained: number } {
    let pointsGained = 0;
    let isValid = false;

    if (type === 'city') {
      if (this.isPlacementValid(type, latitude, altitude, map)) {
        pointsGained += this.abbeyPoints(type, latitude, altitude, map);
        pointsGained += 3;
        isValid = true;
        map[latitude][altitude] = 'city';
      }
    } else if (type === 'road') {
      if (this.isPlacementValid(type, latitude, altitude, map)) {
        pointsGained += this.abbeyPoints(type, latitude, altitude, map);
        pointsGained += 1;
        isValid = true;
        map[latitude][altitude] = 'road';
      }
    } else if (type === 'abbey') {
      if (this.isPlacementValid(type, latitude, altitude, map)) {
        pointsGained += this.abbeyPoints(type, latitude, altitude, map);
        isValid = true;
        map[latitude][altitude] = 'abbey';
      }
    }
    return { isValid: isValid, pointsGained: pointsGained };
  }

  getBoard(): A[][] {
    return this.map;
  }
}

export default Board;
