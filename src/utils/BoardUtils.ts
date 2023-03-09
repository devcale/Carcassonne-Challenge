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

  let allowedTypes: string[] = [];
  let allowedTopCellVariants: number[] = [];
  let allowedBottomCellVariants: number[] = [];
  let allowedRightCellVariants: number[] = [];
  let allowedLeftCellVariants: number[] = [];
  const roadsThatConnectToBottom = [0, 2, 3, 4, 6, 7, 9];
  const roadsThatConnectToLeft = [0, 1, 3, 4, 7, 8, 10];
  const roadsThatConnectToTop = [0, 1, 2, 4, 5, 8, 9];
  const roadsThatConnectToRight = [0, 1, 2, 3, 5, 6, 10];

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
  } else if (gameMode == 'road') {
    if (cell.type === 'city') {
      allowedTypes = ['city', 'abbey', 'road', 'init'];
    } else if (cell.type === 'road') {
      allowedTypes = ['init'];
      if (cell.variant === 0) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 1) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = [];
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 2) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = [];
      } else if (cell.variant === 3) {
        allowedTopCellVariants = [];
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 4) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = [];
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 5) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = [];
        allowedLeftCellVariants = [];
      } else if (cell.variant === 6) {
        allowedTopCellVariants = [];
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = [];
      } else if (cell.variant === 7) {
        allowedTopCellVariants = [];
        allowedRightCellVariants = [];
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 8) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = [];
        allowedBottomCellVariants = [];
        allowedLeftCellVariants = roadsThatConnectToRight;
      } else if (cell.variant === 9) {
        allowedTopCellVariants = roadsThatConnectToBottom;
        allowedRightCellVariants = [];
        allowedBottomCellVariants = roadsThatConnectToTop;
        allowedLeftCellVariants = [];
      } else if (cell.variant === 10) {
        allowedTopCellVariants = [];
        allowedRightCellVariants = roadsThatConnectToLeft;
        allowedBottomCellVariants = [];
        allowedLeftCellVariants = roadsThatConnectToRight;
      }
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
    } else if (currentCell.type === 'inactive' && cell.type === 'road') {
      if (
        (upperCell.type === 'init' && roadsThatConnectToTop.includes(cell.variant)) ||
        (rightCell.type === 'init' && roadsThatConnectToRight.includes(cell.variant)) ||
        (lowerCell.type === 'init' && roadsThatConnectToBottom.includes(cell.variant)) ||
        (leftCell.type === 'init' && roadsThatConnectToLeft.includes(cell.variant)) ||
        (upperCell.type === 'road' &&
          roadsThatConnectToTop.includes(cell.variant) &&
          allowedTopCellVariants.includes(upperCell.variant)) ||
        (rightCell.type === 'road' &&
          roadsThatConnectToRight.includes(cell.variant) &&
          allowedRightCellVariants.includes(rightCell.variant)) ||
        (lowerCell.type === 'road' &&
          roadsThatConnectToBottom.includes(cell.variant) &&
          allowedBottomCellVariants.includes(lowerCell.variant)) ||
        (leftCell.type === 'road' &&
          roadsThatConnectToLeft.includes(cell.variant) &&
          allowedLeftCellVariants.includes(leftCell.variant))
      ) {
        isValid = true;
      }
    }
  }

  return isValid;
}
