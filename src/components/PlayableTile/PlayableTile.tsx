import { useGameStateContext } from '../../context/Context';
import styling from './PlayableTile.module.css';

export const PlayableTile = (props: {
  type: string;
  handIndex: number;
  description: string;
  variation: number;
}) => {
  const { setCurrentTile } = useGameStateContext();

  function handleClick(): void {
    setCurrentTile(props.handIndex);
  }

  return (
    <div
      className={styling.playableTile}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={styling.tileCardInfo}>
        <div className={styling.tileCardTitle}>{props.type}</div>
        <div className={styling.tileCardDescription}>{props.description}</div>
      </div>

      <div className={styling.playableImgContainer}>
        <div
          className={
            styling.playableImg + ' ' + styling[props.type + '-' + props.variation]
          }
        >
          <div className={styling.mobileTile}>{props.type}</div>
        </div>
      </div>
    </div>
  );
};
