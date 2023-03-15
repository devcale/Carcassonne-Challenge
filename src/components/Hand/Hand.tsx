import { useGameStateContext } from '../../context/Context';
import { PlayableTile } from '../PlayableTile/PlayableTile';
import styling from './Hand.module.css';

export const Hand = () => {
  const { hand, gameMode, pointsMultiplier } = useGameStateContext();

  function configureDescription(type: string, variant: number): string {
    let desc = '';
    const pointPlural = pointsMultiplier > 1 ? 'points' : 'point';
    if (type === 'city') {
      if (gameMode === 'city') {
        desc =
          'You only gain points for completed cities. Bigger cities give more points.';
      } else {
        desc =
          'Cities gives you ' +
          2 * pointsMultiplier +
          ' ' +
          pointPlural +
          ' per tile, and an extra ' +
          1 * pointsMultiplier +
          ' ' +
          pointPlural +
          ' for each city chain.';
      }
    } else if (type === 'abbey') {
      if (gameMode === 'abbey') {
        if (variant >= 6) {
          desc =
            'Abbey is ablaze. Every tile that surrounds this abbey will cost you ' +
            1 * pointsMultiplier +
            ' ' +
            pointPlural +
            '.';
        } else {
          desc =
            'Abbey is safe. Every tile that surrounds this abbey will give you ' +
            1 * pointsMultiplier +
            ' ' +
            pointPlural +
            '.';
        }
      } else {
        desc =
          'Abbeys give you ' +
          1 * pointsMultiplier +
          ' ' +
          pointPlural +
          ' for each tile that surrounds it.';
      }
    } else if (type === 'road') {
      if (gameMode === 'road') {
        desc =
          'Roads give you ' +
          1 * pointsMultiplier +
          ' ' +
          pointPlural +
          ' per tile. Can only be placed if it matches the adjacent tile.';
      } else {
        desc =
          'Roads give you ' + 1 * pointsMultiplier + ' ' + pointPlural + ' per tile.';
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
