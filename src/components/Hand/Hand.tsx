import './Hand.css';

import { PlayableTile } from '../PlayableTile/PlayableTile';

export const Hand = () => {
  return (
    <div className="hand">
      <PlayableTile type="city" />
      <PlayableTile type="city" />
      <PlayableTile type="road" />
      <PlayableTile type="abbey" />
    </div>
  );
};
