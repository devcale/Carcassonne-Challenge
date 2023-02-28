import './Cell.css';

import { useEffect, useState } from 'react';

const Cell = (props: any) => {
  const [type, setType] = useState('inactive');

  const tabIndexNum = props.altitude * props.boardDimension + props.latitude;

  function handleClick() {
    if (type === 'inactive') {
      setType('active');
    } else {
      setType('inactive');
    }
    console.log(
      'Cell #' +
        props.latitude +
        ' ' +
        props.altitude +
        ' was clicked and is now ' +
        type,
    );
  }

  useEffect(() => {
    setType(props.type);
  }, []);

  return (
    <div
      className={'cell ' + type}
      id={'cell-' + props.latitude + '-' + props.altitude}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={tabIndexNum}
      style={{ height: props.cellHeight }}
    ></div>
  );
};
export default Cell;
