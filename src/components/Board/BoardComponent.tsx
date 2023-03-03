import { useEffect, useState } from 'react';

import Cell from '../Cell/Cell';
import Board from './Board';
import styling from './BoardComponent.module.css';

export const BoardComponent = (props: { board: Board<string> }) => {
  const [middle, setMiddle] = useState(Math.floor(props.board.getSize() / 2));

  function getCellHeight() {
    const newCellHeight = `${100 / props.board.getSize()}%`;
    return newCellHeight;
  }

  function getColWidth() {
    const newColWidth = `${100 / props.board.getSize()}%`;
    return newColWidth;
  }

  useEffect(() => {
    setMiddle(Math.floor(props.board.getSize() / 2));
  }, []);

  return (
    <div className={styling.board}>
      {props.board.getBoard().map((col: string[], colIndex: number) => (
        <div
          className={styling.boardCol}
          id={'col-' + colIndex}
          key={'col-' + colIndex}
          style={{ width: getColWidth() }}
        >
          {col.map((_, cellIndex: number) => {
            let defaultType = 'inactive';
            if (colIndex === middle && cellIndex === middle) {
              defaultType = 'init';
            }
            const cell = (
              <Cell
                altitude={cellIndex}
                latitude={colIndex}
                boardDimension={props.board.getSize()}
                cellHeight={getCellHeight()}
                type={defaultType}
                key={'cell-' + colIndex + '-' + cellIndex}
              />
            );
            props.board.setInBoard(defaultType, colIndex, cellIndex);
            return cell;
          })}
        </div>
      ))}
    </div>
  );
};
