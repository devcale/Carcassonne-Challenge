type Tile = { type: string; variant: number };
export function IsPlacementValid(
  cell: Tile,
  latitude: number,
  altitude: number,
  map: Tile[][],
  gameMode: string,
): boolean {
  let isValid = false;
  const currentCell = map[latitude][altitude];
  console.log('tile on coordinates is: ' + currentCell.type);
  let upperCell = { type: 'out', variant: -1 };
  let lowerCell = { type: 'out', variant: -1 };
  let rightCell = { type: 'out', variant: -1 };
  let leftCell = { type: 'out', variant: -1 };

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

  const isOnlyCornerTopLeft =
    upperCell.type === 'out' &&
    leftCell.type === 'out' &&
    lowerCell.type === 'inactive' &&
    rightCell.type === 'inactive';
  const isOnlyCornerTopRight =
    upperCell.type === 'out' &&
    leftCell.type === 'inactive' &&
    lowerCell.type === 'inactive' &&
    rightCell.type === 'out';
  const isOnlyCornerBottomLeft =
    upperCell.type === 'inactive' &&
    leftCell.type === 'out' &&
    lowerCell.type === 'out' &&
    rightCell.type === 'inactive';
  const isOnlyCornerBottomRight =
    upperCell.type === 'inactive' &&
    leftCell.type === 'inactive' &&
    lowerCell.type === 'out' &&
    rightCell.type === 'out';
  const isOnlyTop =
    upperCell.type === 'out' &&
    leftCell.type === 'inactive' &&
    lowerCell.type === 'inactive' &&
    rightCell.type === 'inactive';
  const isOnlyRight =
    upperCell.type === 'inactive' &&
    leftCell.type === 'inactive' &&
    lowerCell.type === 'inactive' &&
    rightCell.type === 'out';
  const isOnlyBottom =
    upperCell.type === 'inactive' &&
    leftCell.type === 'inactive' &&
    lowerCell.type === 'out' &&
    rightCell.type === 'inactive';
  const isOnlyLeft =
    upperCell.type === 'inactive' &&
    leftCell.type === 'out' &&
    lowerCell.type === 'inactive' &&
    rightCell.type === 'inactive';
  const isOnlyBorder =
    isOnlyCornerTopLeft ||
    isOnlyCornerTopRight ||
    isOnlyCornerBottomRight ||
    isOnlyCornerBottomLeft ||
    isOnlyTop ||
    isOnlyRight ||
    isOnlyBottom ||
    isOnlyLeft;

  let allowedTypes: string[] = [];
  const roadsThatConnectToBottom = [0, 2, 3, 4, 6, 7, 9];
  const roadsThatConnectToLeft = [0, 1, 3, 4, 7, 8, 10];
  const roadsThatConnectToTop = [0, 1, 2, 4, 5, 8, 9];
  const roadsThatConnectToRight = [0, 1, 2, 3, 5, 6, 10];
  const citiesThatConnectToBottom = [0, 1, 2, 3, 4, 9, 10, 11, 14, 15, 17];
  const citiesThatConnectToLeft = [0, 1, 2, 3, 7, 8, 9, 10, 13, 14, 16];
  const citiesThatConnectToTop = [0, 1, 2, 3, 6, 8, 9, 11, 12, 13, 17];
  const citiesThatConnectToRight = [0, 1, 2, 3, 5, 8, 10, 11, 12, 15, 16];

  // ------------------------------------------- CLASSIC GAMEMODE ------------------------------------------------------
  if (gameMode === 'classic' || gameMode === 'abbey') {
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
  } // ------------------------------------------- ROAD GAMEMODE ------------------------------------------------------
  else if (gameMode == 'road') {
    if (cell.type === 'city') {
      allowedTypes = ['city', 'abbey', 'road', 'init'];
    } else if (cell.type === 'road') {
      let roadIsConnected = false;
      let topConnectsToCurrent = false;
      let currentConnectsToTop = false;
      let rightConnectsToCurrent = false;
      let currentConnectsToRight = false;
      let bottomConnectsToCurrent = false;
      let currentConnectsToBottom = false;
      let leftConnectsToCurrent = false;
      let currentConnectsToLeft = false;
      let topValid = false;
      let rightValid = false;
      let bottomValid = false;
      let leftValid = false;
      let topConnected = false;
      let rightConnected = false;
      let bottomConnected = false;
      let leftConnected = false;
      //Check top:
      if (upperCell.type !== 'inactive') {
        if (upperCell.type === 'road') {
          if (roadsThatConnectToBottom.includes(upperCell.variant)) {
            topConnectsToCurrent = true;
          }
          if (roadsThatConnectToTop.includes(cell.variant)) {
            currentConnectsToTop = true;
          }
        } else if (upperCell.type === 'init') {
          topConnectsToCurrent = true;
          if (roadsThatConnectToTop.includes(cell.variant)) {
            currentConnectsToTop = true;
          }
        }
      }
      topConnected = topConnectsToCurrent && currentConnectsToTop;
      topValid = topConnectsToCurrent === currentConnectsToTop;
      roadIsConnected = topConnected || roadIsConnected;
      //Check right:
      if (rightCell.type !== 'inactive') {
        if (rightCell.type === 'road') {
          if (roadsThatConnectToLeft.includes(rightCell.variant)) {
            rightConnectsToCurrent = true;
          }
          if (roadsThatConnectToRight.includes(cell.variant)) {
            currentConnectsToRight = true;
          }
        } else if (rightCell.type === 'init') {
          rightConnectsToCurrent = true;
          if (roadsThatConnectToRight.includes(cell.variant)) {
            currentConnectsToRight = true;
          }
        }
      }
      rightConnected = rightConnectsToCurrent && currentConnectsToRight;
      rightValid = rightConnectsToCurrent === currentConnectsToRight;
      roadIsConnected = rightConnected || roadIsConnected;
      //Check bottom:
      if (lowerCell.type !== 'inactive') {
        if (lowerCell.type === 'road') {
          if (roadsThatConnectToTop.includes(lowerCell.variant)) {
            bottomConnectsToCurrent = true;
          }
          if (roadsThatConnectToBottom.includes(cell.variant)) {
            currentConnectsToBottom = true;
          }
        } else if (lowerCell.type === 'init') {
          bottomConnectsToCurrent = true;
          if (roadsThatConnectToBottom.includes(cell.variant)) {
            currentConnectsToBottom = true;
          }
        }
      }
      bottomConnected = bottomConnectsToCurrent && currentConnectsToBottom;
      bottomValid = bottomConnectsToCurrent === currentConnectsToBottom;
      roadIsConnected = bottomConnected || roadIsConnected;

      //Check left:
      if (leftCell.type !== 'inactive') {
        if (leftCell.type === 'road') {
          if (roadsThatConnectToRight.includes(leftCell.variant)) {
            leftConnectsToCurrent = true;
          }
          if (roadsThatConnectToLeft.includes(cell.variant)) {
            currentConnectsToLeft = true;
          }
        } else if (leftCell.type === 'init') {
          leftConnectsToCurrent = true;
          if (roadsThatConnectToLeft.includes(cell.variant)) {
            currentConnectsToLeft = true;
          }
        }
      }
      leftConnected = leftConnectsToCurrent && currentConnectsToLeft;
      leftValid = leftConnectsToCurrent === currentConnectsToLeft;
      roadIsConnected = leftConnected || roadIsConnected;

      isValid =
        currentCell.type === 'inactive' &&
        topValid &&
        rightValid &&
        bottomValid &&
        leftValid &&
        roadIsConnected &&
        (upperCell.type !== 'inactive' ||
          rightCell.type !== 'inactive' ||
          lowerCell.type !== 'inactive' ||
          leftCell.type !== 'inactive') &&
        (upperCell.type === 'road' ||
          rightCell.type === 'road' ||
          lowerCell.type === 'road' ||
          leftCell.type === 'road' ||
          upperCell.type === 'init' ||
          rightCell.type === 'init' ||
          lowerCell.type === 'init' ||
          leftCell.type === 'init') &&
        !isOnlyBorder;
    } else if (cell.type === 'abbey') {
      allowedTypes = ['city', 'abbey', 'road', 'init'];
    }

    if (
      currentCell.type === 'inactive' &&
      (cell.type === 'city' || cell.type === 'abbey')
    ) {
      if (
        allowedTypes.includes(upperCell.type) ||
        allowedTypes.includes(lowerCell.type) ||
        allowedTypes.includes(rightCell.type) ||
        allowedTypes.includes(leftCell.type)
      ) {
        console.log('Is allowed because:');
        console.log([
          allowedTypes.includes(upperCell.type),
          allowedTypes.includes(rightCell.type),
          allowedTypes.includes(lowerCell.type),
          allowedTypes.includes(leftCell.type),
        ]);
        isValid = true;
      }
    }
  } // ------------------------------------------- CITY GAMEMODE ------------------------------------------------------
  else if (gameMode == 'city') {
    if (currentCell.type === 'inactive' && cell.type === 'abbey') {
      let upperValid = false;
      let rightValid = false;
      let lowerValid = false;
      let leftValid = false;
      //Check top:
      if (upperCell.type !== 'inactive') {
        if (upperCell.type === 'city') {
          if (!citiesThatConnectToBottom.includes(upperCell.variant)) {
            upperValid = true;
          }
        } else if (upperCell.type === 'abbey') {
          upperValid = false;
        } else if (upperCell.type === 'init' || upperCell.type === 'out') {
          upperValid = true;
        }
      } else {
        upperValid = true;
      }
      //Check right:
      if (rightCell.type !== 'inactive') {
        if (rightCell.type === 'city') {
          if (!citiesThatConnectToLeft.includes(rightCell.variant)) {
            rightValid = true;
          }
        } else if (rightCell.type === 'abbey') {
          rightValid = false;
        } else if (rightCell.type === 'init' || rightCell.type === 'out') {
          rightValid = true;
        }
      } else {
        rightValid = true;
      }
      //Check bottom:
      if (lowerCell.type !== 'inactive') {
        if (lowerCell.type === 'city') {
          if (!citiesThatConnectToTop.includes(lowerCell.variant)) {
            lowerValid = true;
          }
        } else if (lowerCell.type === 'abbey') {
          lowerValid = false;
        } else if (lowerCell.type === 'init' || lowerCell.type === 'out') {
          lowerValid = true;
        }
      } else {
        lowerValid = true;
      }
      //Check left:
      if (leftCell.type !== 'inactive') {
        if (leftCell.type === 'city') {
          if (!citiesThatConnectToRight.includes(leftCell.variant)) {
            leftValid = true;
          }
        } else if (leftCell.type === 'abbey') {
          leftValid = false;
        } else if (leftCell.type === 'init' || leftCell.type === 'out') {
          leftValid = true;
        }
      } else {
        leftValid = true;
      }

      isValid =
        upperValid &&
        rightValid &&
        lowerValid &&
        leftValid &&
        (upperCell.type !== 'inactive' ||
          rightCell.type !== 'inactive' ||
          lowerCell.type !== 'inactive' ||
          leftCell.type !== 'inactive') &&
        !isOnlyBorder;
    } else if (currentCell.type === 'inactive' && cell.type === 'city') {
      let topConnectsToCurrent = false;
      let currentConnectsToTop = false;
      let rightConnectsToCurrent = false;
      let currentConnectsToRight = false;
      let bottomConnectsToCurrent = false;
      let currentConnectsToBottom = false;
      let leftConnectsToCurrent = false;
      let currentConnectsToLeft = false;
      //Check top:
      if (upperCell.type !== 'inactive') {
        if (upperCell.type === 'city') {
          if (citiesThatConnectToBottom.includes(upperCell.variant)) {
            topConnectsToCurrent = true;
          }
          if (citiesThatConnectToTop.includes(cell.variant)) {
            currentConnectsToTop = true;
          }
        } else {
          if (!citiesThatConnectToTop.includes(cell.variant)) {
            topConnectsToCurrent = true;
            currentConnectsToTop = true;
          } else {
            topConnectsToCurrent = true;
            currentConnectsToTop = false;
          }
        }
      }

      //Check right:
      if (rightCell.type !== 'inactive') {
        if (rightCell.type === 'city') {
          if (citiesThatConnectToLeft.includes(rightCell.variant)) {
            rightConnectsToCurrent = true;
          }
          if (citiesThatConnectToRight.includes(cell.variant)) {
            currentConnectsToRight = true;
          }
        } else {
          if (!citiesThatConnectToRight.includes(cell.variant)) {
            rightConnectsToCurrent = true;
            currentConnectsToRight = true;
          } else {
            rightConnectsToCurrent = true;
            currentConnectsToRight = false;
          }
        }
      }

      //Check bottom:
      if (lowerCell.type !== 'inactive') {
        if (lowerCell.type === 'city') {
          if (citiesThatConnectToTop.includes(lowerCell.variant)) {
            bottomConnectsToCurrent = true;
          }
          if (citiesThatConnectToBottom.includes(cell.variant)) {
            currentConnectsToBottom = true;
          }
        } else {
          if (!citiesThatConnectToBottom.includes(cell.variant)) {
            bottomConnectsToCurrent = true;
            currentConnectsToBottom = true;
          } else {
            bottomConnectsToCurrent = true;
            currentConnectsToBottom = false;
          }
        }
      }

      //Check left:
      if (leftCell.type !== 'inactive') {
        if (leftCell.type === 'city') {
          if (citiesThatConnectToRight.includes(leftCell.variant)) {
            leftConnectsToCurrent = true;
          }
          if (citiesThatConnectToLeft.includes(cell.variant)) {
            currentConnectsToLeft = true;
          }
        } else {
          if (!citiesThatConnectToLeft.includes(cell.variant)) {
            leftConnectsToCurrent = true;
            currentConnectsToLeft = true;
          } else {
            leftConnectsToCurrent = true;
            currentConnectsToLeft = false;
          }
        }
      }

      isValid =
        topConnectsToCurrent === currentConnectsToTop &&
        rightConnectsToCurrent === currentConnectsToRight &&
        bottomConnectsToCurrent === currentConnectsToBottom &&
        leftConnectsToCurrent === currentConnectsToLeft &&
        (upperCell.type !== 'inactive' ||
          rightCell.type !== 'inactive' ||
          lowerCell.type !== 'inactive' ||
          leftCell.type !== 'inactive') &&
        !isOnlyBorder;
    }
  } // ------------------------------------------- ABBEY GAMEMODE ------------------------------------------------------
  // else if (gameMode == 'abbey') {

  // }

  return isValid;
}

type Coordinate = [number, number];
// latitude and altitude are the coordinates of the tile being checked
// Uses DFS to add all tiles that are adjacent (chain of tiles).
export function TilesInChain(
  cell: Tile,
  latitude: number,
  altitude: number,
  map: Tile[][],
): Coordinate[] {
  const cellsInChain: Coordinate[] = [];

  const citiesThatCloseTop: number[] = [4, 5, 7, 10, 14, 15, 16];
  const citiesThatCloseRight: number[] = [4, 6, 7, 9, 13, 14, 17];
  const citiesThatCloseBottom: number[] = [5, 6, 7, 8, 12, 13, 16];
  const citiesThatCloseLeft: number[] = [4, 5, 6, 11, 12, 15, 17];

  if (map[latitude][altitude].type === cell.type) {
    const visited: boolean[][] = [];
    for (let i = 0; i < map.length; i++) {
      const newCol = [];
      for (let j = 0; j < map[0].length; j++) {
        newCol.push(false);
      }
      visited.push(newCol);
    }

    const stack: Coordinate[] = [[latitude, altitude]];

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [currentLatitude, currentAltitude] = stack.pop()!;

      if (
        currentLatitude >= 0 &&
        currentLatitude < visited.length &&
        currentAltitude >= 0 &&
        currentAltitude < visited[0].length &&
        visited[currentLatitude][currentAltitude] === false
      ) {
        cellsInChain.push([currentLatitude, currentAltitude]);
        visited[currentLatitude][currentAltitude] = true;

        const topCell = { lat: currentLatitude, alt: currentAltitude - 1 };
        const rightCell = { lat: currentLatitude + 1, alt: currentAltitude };
        const bottomCell = { lat: currentLatitude, alt: currentAltitude + 1 };
        const leftCell = { lat: currentLatitude - 1, alt: currentAltitude };

        // Check top:
        if (!citiesThatCloseTop.includes(map[currentLatitude][currentAltitude].variant)) {
          if (
            topCell.lat >= 0 &&
            topCell.lat < visited.length &&
            topCell.alt >= 0 &&
            topCell.alt < visited[0].length
          ) {
            if (
              visited[topCell.lat][topCell.alt] === false &&
              map[topCell.lat][topCell.alt].type === cell.type
            ) {
              if (
                !citiesThatCloseBottom.includes(map[topCell.lat][topCell.alt].variant)
              ) {
                stack.push([topCell.lat, topCell.alt]);
              }
            }
          }
        }

        // Check right:
        if (
          !citiesThatCloseRight.includes(map[currentLatitude][currentAltitude].variant)
        ) {
          if (
            rightCell.lat >= 0 &&
            rightCell.lat < visited.length &&
            rightCell.alt >= 0 &&
            rightCell.alt < visited[0].length
          ) {
            if (
              visited[rightCell.lat][rightCell.alt] === false &&
              map[rightCell.lat][rightCell.alt].type === cell.type
            ) {
              if (
                !citiesThatCloseLeft.includes(map[rightCell.lat][rightCell.alt].variant)
              ) {
                stack.push([rightCell.lat, rightCell.alt]);
              }
            }
          }
        }

        // Check bottom:
        if (
          !citiesThatCloseBottom.includes(map[currentLatitude][currentAltitude].variant)
        ) {
          if (
            bottomCell.lat >= 0 &&
            bottomCell.lat < visited.length &&
            bottomCell.alt >= 0 &&
            bottomCell.alt < visited[0].length
          ) {
            if (
              visited[bottomCell.lat][bottomCell.alt] === false &&
              map[bottomCell.lat][bottomCell.alt].type === cell.type
            ) {
              if (
                !citiesThatCloseTop.includes(map[bottomCell.lat][bottomCell.alt].variant)
              ) {
                stack.push([bottomCell.lat, bottomCell.alt]);
              }
            }
          }
        }

        // Check left:
        if (
          !citiesThatCloseLeft.includes(map[currentLatitude][currentAltitude].variant)
        ) {
          if (
            leftCell.lat >= 0 &&
            leftCell.lat < visited.length &&
            leftCell.alt >= 0 &&
            leftCell.alt < visited[0].length
          ) {
            if (
              visited[leftCell.lat][leftCell.alt] === false &&
              map[leftCell.lat][leftCell.alt].type === cell.type
            ) {
              if (
                !citiesThatCloseRight.includes(map[leftCell.lat][leftCell.alt].variant)
              ) {
                stack.push([leftCell.lat, leftCell.alt]);
              }
            }
          }
        }
      }
    }
  }
  return cellsInChain;
}

export function IsCityClosed(cityChain: Coordinate[], map: Tile[][]): boolean {
  let closed = true;
  const citiesThatCloseTop: number[] = [4, 5, 7, 10, 14, 15, 16];
  const citiesThatCloseRight: number[] = [4, 6, 7, 9, 13, 14, 17];
  const citiesThatCloseBottom: number[] = [5, 6, 7, 8, 12, 13, 16];
  const citiesThatCloseLeft: number[] = [4, 5, 6, 11, 12, 15, 17];
  for (let i = 0; i < cityChain.length && closed; i++) {
    const [currentLat, currentAlt] = cityChain[i];
    let upperCell = { type: 'out', variant: -1 };
    let lowerCell = { type: 'out', variant: -1 };
    let rightCell = { type: 'out', variant: -1 };
    let leftCell = { type: 'out', variant: -1 };

    if (currentAlt - 1 >= 0) {
      upperCell = map[currentLat][currentAlt - 1];
    }
    if (currentAlt + 1 < map.length) {
      lowerCell = map[currentLat][currentAlt + 1];
    }
    if (currentLat + 1 < map.length) {
      rightCell = map[currentLat + 1][currentAlt];
    }
    if (currentLat - 1 >= 0) {
      leftCell = map[currentLat - 1][currentAlt];
    }

    //Check top
    if (!citiesThatCloseTop.includes(map[currentLat][currentAlt].variant)) {
      if (upperCell.type !== 'city') {
        closed = false;
      }
    }
    //Check right
    if (!citiesThatCloseRight.includes(map[currentLat][currentAlt].variant)) {
      if (rightCell.type !== 'city') {
        closed = false;
      }
    }
    //Check bottom
    if (!citiesThatCloseBottom.includes(map[currentLat][currentAlt].variant)) {
      if (lowerCell.type !== 'city') {
        closed = false;
      }
    }
    //Check left
    if (!citiesThatCloseLeft.includes(map[currentLat][currentAlt].variant)) {
      if (leftCell.type !== 'city') {
        closed = false;
      }
    }
  }
  return closed;
}
