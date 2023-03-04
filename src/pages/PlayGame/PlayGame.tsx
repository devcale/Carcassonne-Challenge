import Board from '../../components/Board/Board';
import { BoardComponent } from '../../components/Board/BoardComponent';
import { Discard } from '../../components/Discard/Discard';
import { Hand } from '../../components/Hand/Hand';
import { Points } from '../../components/Points/Points';
import styling from './PlayGame.module.css';

export const PlayGame = (props: { board: Board<string> }) => {
  return (
    <div className={styling.playgame}>
      <div className={styling.title}>Carcassonne Challenge</div>
      <div className={styling.playArea}>
        <div className={styling.handContainer}>
          <Hand />
          <Discard />
        </div>

        <div className={styling.boardContainer}>
          <BoardComponent board={props.board} />
        </div>
        <div className={styling.pointsContainer}>
          <Points />
        </div>
      </div>
    </div>
  );
};
