import { useEffect } from 'react';

import { useGameStateContext } from '../../context/Context';
import Cell from '../Cell/Cell';
import styling from './BoardComponent.module.css';
type cellType = { type: string; variant: number };
export const BoardComponent = () => {
  const { mapGlobal } = useGameStateContext();

  return (
    <div className={styling.board}>
      {mapGlobal.map((col: cellType[], colIndex: number) => (
        <div
          className={styling.boardCol}
          id={'col-' + colIndex}
          key={'col-' + colIndex}
          style={{ width: `${100 / mapGlobal.length}%` }}
        >
          {col.map((_, cellIndex: number) => {
            let defaultType = 'inactive';

            if (
              colIndex === Math.floor(mapGlobal.length / 2) &&
              cellIndex === Math.floor(mapGlobal.length / 2)
            ) {
              defaultType = 'init';
            }
            const cell = (
              <Cell
                altitude={cellIndex}
                latitude={colIndex}
                boardDimension={mapGlobal.length}
                cellHeight={`${100 / mapGlobal.length}%`}
                type={defaultType}
                variant={0}
                key={'cell-' + colIndex + '-' + cellIndex}
              />
            );

            return cell;
          })}
        </div>
      ))}
    </div>
  );
};
