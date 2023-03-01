import './PlayableTile.css';

import { useGameStateContext } from '../../helper/Context';

export const PlayableTile = (props: any) => {
  const { setCurrentTile } = useGameStateContext();

  function handleClick(): void {
    console.log(props.handIndex);
    setCurrentTile(props.handIndex);
  }

  return (
    <div
      className={'playable-tile '}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={props.handIndex + 1}
    >
      <div className="tile-card-info">
        <div className="tile-card-title">{props.type}</div>
        <div className="tile-card-description">{props.description}</div>
      </div>

      <div className="playable-img-container">
        <div className={'playable-img ' + props.type + '-' + props.variation}> </div>
      </div>
    </div>
  );
};
