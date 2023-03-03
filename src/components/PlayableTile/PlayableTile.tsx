import { useGameStateContext } from '../../context/Context';
import styling from './PlayableTile.module.css';

export const PlayableTile = (props: any) => {
  const { setCurrentTile } = useGameStateContext();

  function handleClick(): void {
    setCurrentTile(props.handIndex);
  }

  console.log();
  return (
    <div
      className={styling.playableTile}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={props.handIndex + 1}
    >
      <div className={styling.tileCardInfo}>
        <div className={styling.tileCardTitle}>{props.type}</div>
        <div className={styling.tileCardDescription}>{props.description}</div>
      </div>

      <div className={styling.playableImgContainer}>
        <div
          className={styling.playableImg + ' ' + styling[props.type + props.variation]}
        >
          <div className={styling.mobileTile}>{props.type}</div>
        </div>
      </div>
    </div>
  );
};
