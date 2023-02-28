import './Hand.css';

import { useGameStateContext } from '../../helper/Context';
import { PlayableTile } from '../PlayableTile/PlayableTile';

export const Hand = () => {
  const { hand } = useGameStateContext();
  return (
    <div className="hand">
      <PlayableTile type={hand[0]} handIndex={0} />
      <PlayableTile type={hand[1]} handIndex={1} />
      <PlayableTile type={hand[2]} handIndex={2} />
      <PlayableTile type={hand[3]} handIndex={3} />
    </div>
  );
};
