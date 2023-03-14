import { useGameStateContext } from '../../context/Context';
import { PlayableTile } from '../PlayableTile/PlayableTile';
import styling from './Hand.module.css';

export const Hand = () => {
  const { hand } = useGameStateContext();

  function configureDescription(type: string): string {
    let desc = '';
    if (type === 'city') {
      desc =
        'Cities gives you two points per tile, and an extra point for each city chain.';
    } else if (type === 'abbey') {
      desc = 'Abbeys give you one point for each tile that surrounds it.';
    } else if (type === 'road') {
      desc = 'Roads give you one point per tile.';
    }
    return desc;
  }

  return (
    <div className={styling.hand}>
      <PlayableTile
        type={hand[0][0]}
        variation={hand[0][1]}
        handIndex={0}
        description={configureDescription(hand[0][0])}
      />
      <PlayableTile
        type={hand[1][0]}
        handIndex={1}
        variation={hand[1][1]}
        description={configureDescription(hand[1][0])}
      />
      <PlayableTile
        type={hand[2][0]}
        handIndex={2}
        variation={hand[2][1]}
        description={configureDescription(hand[2][0])}
      />
      <PlayableTile
        type={hand[3][0]}
        handIndex={3}
        variation={hand[3][1]}
        description={configureDescription(hand[3][0])}
      />
    </div>
  );
};
