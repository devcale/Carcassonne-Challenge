import { useGameStateContext } from '../../context/Context';
import { PlayableTile } from '../PlayableTile/PlayableTile';
import styling from './Hand.module.css';

export const Hand = () => {
  const { hand, gameMode } = useGameStateContext();

  function configureDescription(type: string, variant: number): string {
    let desc = '';
    if (type === 'city') {
      if (gameMode === 'city') {
        desc =
          'You only gain points for completed cities. Bigger cities give more points.';
      } else {
        desc =
          'Cities gives you two points per tile, and an extra point for each city chain.';
      }
    } else if (type === 'abbey') {
      if (gameMode === 'abbey') {
        if (variant >= 6) {
          desc =
            'Abbey is ablaze. Every tile that surrounds this abbey will cost you a point.';
        } else {
          desc =
            'Abbey is safe. Every tile that surrounds this abbey will give you a point.';
        }
      } else {
        desc = 'Abbeys give you one point for each tile that surrounds it.';
      }
    } else if (type === 'road') {
      if (gameMode === 'road') {
        desc =
          'Roads give you one point per tile. Can only be placed if it matches the adjacent tile.';
      } else {
        desc = 'Roads give you one point per tile.';
      }
    }
    return desc;
  }

  return (
    <div className={styling.hand}>
      <PlayableTile
        type={hand[0][0]}
        variation={hand[0][1]}
        handIndex={0}
        description={configureDescription(hand[0][0], hand[0][1])}
      />
      <PlayableTile
        type={hand[1][0]}
        handIndex={1}
        variation={hand[1][1]}
        description={configureDescription(hand[1][0], hand[1][1])}
      />
      <PlayableTile
        type={hand[2][0]}
        handIndex={2}
        variation={hand[2][1]}
        description={configureDescription(hand[2][0], hand[2][1])}
      />
      <PlayableTile
        type={hand[3][0]}
        handIndex={3}
        variation={hand[3][1]}
        description={configureDescription(hand[3][0], hand[3][1])}
      />
    </div>
  );
};
