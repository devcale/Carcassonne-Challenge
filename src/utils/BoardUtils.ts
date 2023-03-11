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
  const allowedRoadTopCellVariants: number[] = [];
  const allowedRoadBottomCellVariants: number[] = [];
  const allowedRoadRightCellVariants: number[] = [];
  const allowedRoadLeftCellVariants: number[] = [];
  const roadsThatConnectToBottom = [0, 2, 3, 4, 6, 7, 9];
  const roadsThatConnectToLeft = [0, 1, 3, 4, 7, 8, 10];
  const roadsThatConnectToTop = [0, 1, 2, 4, 5, 8, 9];
  const roadsThatConnectToRight = [0, 1, 2, 3, 5, 6, 10];
  const citiesThatConnectToBottom = [0, 4, 7, 9, 10, 11, 14, 15, 17, 18, 19, 20, 21];
  const citiesThatConnectToLeft = [3, 6, 7, 8, 9, 10, 13, 14, 16, 18, 19, 20, 21];
  const citiesThatConnectToTop = [2, 5, 6, 8, 9, 11, 12, 13, 17, 18, 19, 20, 21];
  const citiesThatConnectToRight = [1, 4, 5, 8, 10, 11, 12, 15, 16, 18, 19, 20, 21];

  // ------------------------------------------- CLASSIC GAMEMODE ------------------------------------------------------
  if (gameMode === 'classic') {
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
        if (upperCell.type === 'road') {
          if (roadsThatConnectToBottom.includes(upperCell.variant)) {
            topConnectsToCurrent = true;
          }
          if (roadsThatConnectToTop.includes(cell.variant)) {
            currentConnectsToTop = true;
          }
        } else {
          topConnectsToCurrent = true;
          currentConnectsToTop = true;
        }
      }

      //Check right:
      if (rightCell.type !== 'inactive') {
        if (rightCell.type === 'road') {
          if (roadsThatConnectToLeft.includes(rightCell.variant)) {
            rightConnectsToCurrent = true;
          }
          if (roadsThatConnectToRight.includes(cell.variant)) {
            currentConnectsToRight = true;
          }
        } else {
          topConnectsToCurrent = true;
          currentConnectsToTop = true;
        }
      }

      //Check bottom:
      if (lowerCell.type !== 'inactive') {
        if (lowerCell.type === 'road') {
          if (roadsThatConnectToTop.includes(lowerCell.variant)) {
            bottomConnectsToCurrent = true;
          }
          if (roadsThatConnectToBottom.includes(cell.variant)) {
            currentConnectsToBottom = true;
          }
        } else {
          topConnectsToCurrent = true;
          currentConnectsToTop = true;
        }
      }

      //Check left:
      if (leftCell.type !== 'inactive') {
        if (leftCell.type === 'road') {
          if (roadsThatConnectToRight.includes(leftCell.variant)) {
            leftConnectsToCurrent = true;
          }
          if (roadsThatConnectToLeft.includes(cell.variant)) {
            currentConnectsToLeft = true;
          }
        } else {
          topConnectsToCurrent = true;
          currentConnectsToTop = true;
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
        } else if (rightCell.type === 'init' || upperCell.type === 'out') {
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
        } else if (lowerCell.type === 'init' || upperCell.type === 'out') {
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
        } else if (leftCell.type === 'init' || upperCell.type === 'out') {
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

      /* const adjacentCells = [upperCell, rightCell, lowerCell, leftCell];
      console.log(adjacentCells);
      const citiesThatConnect = [
        citiesThatConnectToBottom,
        citiesThatConnectToLeft,
        citiesThatConnectToTop,
        citiesThatConnectToRight,
      ];
      // For city that is being placed, city variants that can be connected through each cardinal point
      const allowedAdjacentCities = [
        allowedCityTopCellVariants,
        allowedCityRightCellVariants,
        allowedCityBottomCellVariants,
        allowedCityLeftCellVariants,
      ];
      let cityValid = true;
      for (let i = 0; i < adjacentCells.length && cityValid; i++) {
        console.log('Checking: ' + i);
        console.log('Allowed adjacent: ');
        console.log(allowedAdjacentCities);
        console.log('Adjacent type is: ' + adjacentCells[i].type);
        console.log('Adjacent variant is: ' + adjacentCells[i].variant);
        console.log(
          'Does this cell connect to ' +
            i +
            ' cell?: ' +
            citiesThatConnect[i].includes(cell.variant),
        );
        console.log(
          'Does ' +
            i +
            ' cell connect to this cell?: ' +
            allowedAdjacentCities[i].includes(adjacentCells[i].variant),
        );
        if (
          adjacentCells[i].type === 'init' &&
          citiesThatConnect[i].includes(cell.variant)
        ) {
          cityValid = false;
        }

        if (adjacentCells[i].type === 'city') {
          if (!allowedAdjacentCities[i].includes(adjacentCells[i].variant)) {
            cityValid = false;
          }
          if (
            !citiesThatConnect[i].includes(cell.variant) &&
            allowedAdjacentCities[i].includes(adjacentCells[i].variant)
          ) {
            console.log('This has grass and adjacent has city');
            cityValid = false;
          }
          if (
            citiesThatConnect[i].includes(cell.variant) &&
            !allowedAdjacentCities[i].includes(adjacentCells[i].variant)
          ) {
            console.log('This has city and adjacent has grass');
            cityValid = false;
          }
          if (
            !citiesThatConnect[i].includes(cell.variant) &&
            !allowedAdjacentCities[i].includes(adjacentCells[i].variant)
          ) {
            console.log('Both have grass');
            cityValid = false;
          }
        } else if (adjacentCells[i].type !== 'inactive') {
          if (citiesThatConnect[i].includes(cell.variant)) {
            cityValid = false;
          }
        }
      }
      isValid = cityValid; */
      // if (
      //   (upperCell.type === 'city' &&
      //     citiesThatConnectToTop.includes(cell.variant) &&
      //     allowedCityTopCellVariants.includes(upperCell.variant)) ||
      //   (rightCell.type === 'city' &&
      //     citiesThatConnectToRight.includes(cell.variant) &&
      //     allowedCityRightCellVariants.includes(rightCell.variant)) ||
      //   (lowerCell.type === 'city' &&
      //     citiesThatConnectToBottom.includes(cell.variant) &&
      //     allowedCityBottomCellVariants.includes(lowerCell.variant)) ||
      //   (leftCell.type === 'city' &&
      //     citiesThatConnectToLeft.includes(cell.variant) &&
      //     allowedCityLeftCellVariants.includes(leftCell.variant))
      // ) {
      //   isValid = true;
      // }
    }
  }

  return isValid;
}
