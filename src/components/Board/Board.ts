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
    console.log(
      '---------------------------------CHECKING GAME END----------------------------',
    );
    console.log('game mode is: ' + gameMode);
    let found = false;

    let gameHasEnded = true;
    let handTile: cellType = { type: '', variant: -1 };
    if (discardCountdown === 0) {
      console.log('game has not ended because of discard');
      gameHasEnded = false;
    } else {
      console.log('hand is');
      console.log(hand);
      for (let handIndex = 0; handIndex < hand.length && !found; handIndex++) {
        handTile = {
          type: hand[handIndex][0],
          variant: hand[handIndex][1],
        };
        for (let i = 0; i < map.length && !found; i++) {
          for (let j = 0; j < map[i].length && !found; j++) {
            if (IsPlacementValid(handTile, i, j, map, gameMode)) {
              console.log('found possible with hand index: ' + handIndex);
              console.log('found possible with col index: ' + i);
              console.log('found possible with row index: ' + j);

              gameHasEnded = false;
              found = true;
            }
          }
        }
      }
    }
    console.log('map is: ');
    console.log(map);

    console.log('Game has ended?');
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
