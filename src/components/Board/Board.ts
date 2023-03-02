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
    let upperCell = '';
    let lowerCell = '';
    let rightCell = '';
    let leftCell = '';
    if (altitude - 1 >= 0) {
      upperCell = map[latitude][altitude - 1];
    } else {
      upperCell = 'out';
    }
    if (altitude + 1 < map.length) {
      lowerCell = map[latitude][altitude + 1];
    } else {
      lowerCell = 'out';
    }
    if (latitude + 1 < map.length) {
      rightCell = map[latitude + 1][altitude];
    } else {
      rightCell = 'out';
    }
    if (latitude - 1 >= 0) {
      leftCell = map[latitude - 1][altitude];
    } else {
      leftCell = 'out';
    }

    if (type === 'city') {
      const allowed = ['city', 'abbey', 'road', 'init'];
      if (
        allowed.includes(upperCell) ||
        allowed.includes(lowerCell) ||
        allowed.includes(rightCell) ||
        allowed.includes(leftCell)
      ) {
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
        pointsGained += 1;
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
