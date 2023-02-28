class Board<A> {
  private values: A[][];

  constructor(width: number, height: number, init: () => A) {
    this.values = [];
    for (let i = 0; i < width; i++) {
      const row: A[] = [];
      for (let j = 0; j < height; j++) {
        row.push(init());
      }
      this.values.push(row);
    }
  }

  getFromBoard(x: number, y: number): A {
    return this.values[x][y];
  }

  setInBoard(x: number, y: number, newValue: A) {
    this.values[x][y] = newValue;
  }

  getBoard(): A[][] {
    return this.values;
  }
}

export default Board;
