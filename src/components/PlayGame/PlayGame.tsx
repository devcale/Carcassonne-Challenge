import './PlayGame.css';

import { useEffect, useState } from 'react';

import Board from '../Board/Board';
import Cell from '../Cell/Cell';
import { Hand } from '../Hand/Hand';
import { Points } from '../Points/Points';

export const PlayGame = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [middle, setMiddle] = useState(Math.floor(boardSize / 2));

  const board = new Board(boardSize, boardSize, () => <Cell altitude={0} latitude={0} />);

  console.log(middle);

  useEffect(() => {
    setMiddle(Math.floor(boardSize / 2));
  }, []);

  function getCellHeight() {
    const newCellHeight = `${100 / boardSize}%`;
    return newCellHeight;
  }

  function getColWidth() {
    const newColWidth = `${100 / boardSize}%`;
    return newColWidth;
  }
  return (
    <div>
      <div className="App">
        <div className="title">Carcassonne Challenge</div>
        <div className="play-area">
          <div className="hand-container">
            <Hand />
          </div>

          <div className="board-container">
            <div className="board">
              {board.getBoard().map((col, colIndex) => (
                <div
                  className="board-col"
                  id={'col-' + colIndex}
                  key={'col-' + colIndex}
                  style={{ width: getColWidth() }}
                >
                  {col.map((_, cellIndex) => {
                    let defaultType = 'inactive';
                    if (colIndex === middle && cellIndex === middle) {
                      defaultType = 'init';
                    }
                    const cell = (
                      <Cell
                        altitude={cellIndex}
                        latitude={colIndex}
                        boardDimension={boardSize}
                        cellHeight={getCellHeight()}
                        type={defaultType}
                        key={'cell-' + colIndex + '-' + cellIndex}
                      />
                    );
                    board.setInBoard(colIndex, cellIndex, cell);
                    return cell;
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="points-container">
            <Points />
          </div>
        </div>
      </div>
    </div>
  );
};
