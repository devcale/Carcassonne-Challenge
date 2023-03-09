import { IsPlacementValid } from '../../utils/BoardUtils';
import { GainPoints } from '../../utils/PointUtils';

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

  // getFromBoard(x: number, y: number): cellType {
  //   return this.map[x][y];
  // }

  // setInBoard(type: cellType, latitude: number, altitude: number): void {
  //   this.map[latitude][altitude] = type;
  // }

  // getSize() {
  //   return this.size;
  // }

  checkGameEnd(
    hand: [[string, number], [string, number], [string, number], [string, number]],
    map: cellType[][],
    discardCountdown: number,
    gameMode: string,
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
            if (IsPlacementValid(handTile, j, k, map, gameMode)) {
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
    gameMode: string,
  ): { isValid: boolean; pointsGained: number } {
    console.log('Game mode is: ' + gameMode);
    console.log('Placing: ' + cell.type + ':' + cell.variant);
    let pointsGained = 0;
    let isValid = false;

    if (IsPlacementValid(cell, latitude, altitude, map, gameMode)) {
      pointsGained += GainPoints(cell, latitude, altitude, map, gameMode);
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
