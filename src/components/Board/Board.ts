class Board<A> {
  private map: A[][];

  constructor(width: number, height: number, init: () => A, center: () => A) {
    this.map = [];
    const middle = Math.floor(width / 2);
    for (let i = 0; i < width; i++) {
      const row: A[] = [];
      for (let j = 0; j < height; j++) {
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

  // Returns a boolean-number pair
  // The boolean is used to indicate if the tile was successfully placed
  // The number is the amount of points gained
  placeTile(
    type: string,
    latitude: number,
    altitude: number,
    map: string[][],
  ): { isValid: boolean; pointsGained: number } {
    let isValid = false;
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

    if (type === 'city') {
      const allowed = ['city', 'abbey', 'road', 'init'];
      if (
        allowed.includes(upperCell) ||
        allowed.includes(lowerCell) ||
        allowed.includes(rightCell) ||
        allowed.includes(leftCell)
      ) {
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
        pointsGained += 3;
        isValid = true;
        map[latitude][altitude] = 'city';
      }
    } else if (type === 'road') {
      const allowed = ['road', 'init'];
      if (
        allowed.includes(upperCell) ||
        allowed.includes(lowerCell) ||
        allowed.includes(rightCell) ||
        allowed.includes(leftCell)
      ) {
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
        pointsGained += 1;
        isValid = true;
        map[latitude][altitude] = 'road';
      }
    } else if (type === 'abbey') {
      const allowed = ['city', 'abbey', 'road', 'init'];
      if (
        allowed.includes(upperCell) ||
        allowed.includes(lowerCell) ||
        allowed.includes(rightCell) ||
        allowed.includes(leftCell)
      ) {
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
