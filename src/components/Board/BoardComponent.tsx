import { useEffect } from 'react';

import { useGameStateContext } from '../../context/Context';
import Cell from '../Cell/Cell';
import styling from './BoardComponent.module.css';

export const BoardComponent = () => {
  const {
    mapGlobal,
    setPoints,
    setDiscardCountdown,
    setAbbeyCountdown,
    setCityCountdown,
  } = useGameStateContext();

  useEffect(() => {
    setDiscardCountdown(5);
    setAbbeyCountdown(15);
    setCityCountdown([12, 13, 14]);
    setPoints(0);
    console.log('Rendered board with board size: ' + mapGlobal.length);
    console.log('Map is: ');
    console.log(mapGlobal);
  }, []);

  return (
    <div className={styling.board}>
      {mapGlobal.map((col: string[], colIndex: number) => (
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
