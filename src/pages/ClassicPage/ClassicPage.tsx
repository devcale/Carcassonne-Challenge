import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useGameStateContext } from '../../context/Context';
import styling from './ClassicPage.module.css';

export const ClassicPage = () => {
  const { pointsMultiplier } = useGameStateContext();

  const pointPlural = pointsMultiplier > 1 ? 'points' : 'point';
  return (
    <>
      <Link to="/Carcassonne-Challenge/howtoplay">
        <div className={styling.backButton}>
          <FaArrowLeft />
        </div>
      </Link>
      <div className={styling.instructionsContainer}>
        <div className={styling.instructionsContentContainer}>
          <h2 id="objective">Carcassonne Challenge Mode</h2>
          <p>
            The objective of Carcassonne Challenge is to score the most points by
            strategically placing tiles within the limits of a board. 💡
          </p>
          <p>
            The game is played by placing tiles on the board to create a landscape. The
            landscape will be occupied by tiles representing roads, abbeys and cities.
            Each of these tiles give the player a different amount of points.
          </p>

          <h2 id="rules">Rules 📜</h2>
          <ul>
            <li>
              <p>At the start of each game, you will be dealt four random tiles.</p>
            </li>
            <li>
              <p>On each turn you will only be able to place one tile of these types:</p>
              <ul>
                <li>
                  <p>
                    🏰 Cities: They can be placed in any free space that is adjacent to
                    any placed tile.
                  </p>
                </li>
                <li>
                  <p>
                    🛣️ Roads: They can be placed in any free space that has an adjacent
                    road.
                  </p>
                </li>
                <li>
                  <p>
                    ⛪ Abbeys: They can be placed in any free space that is adjacent to
                    any placed tile.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>After a tile is placed, you will be dealt a new random tile.</p>
            </li>
            <li>
              <p>
                You are able to discard the tiles in your hand, but this ability takes 5
                turns to recharge.
              </p>
            </li>
            <li>
              <p>
                The game ends when all tiles have been placed, or a tile in your current
                hand can&apos;t be played and you have no discards available. 💥
              </p>
            </li>
          </ul>

          <h2 id="points">Points ⭐</h2>
          <p>You are able to gain points through a variety of ways:</p>
          <ul>
            <li>
              <p>
                Roads give you {1 * pointsMultiplier} {pointPlural} per tile.
              </p>
            </li>
            <li>
              <p>
                Abbeys give you {1 * pointsMultiplier} {pointPlural} for each tile that
                surrounds it. This way, the maximum amount of points per Abbey is{' '}
                {8 * pointsMultiplier} {pointPlural}.
              </p>
            </li>
            <li>
              <p>
                Cities gives you {2 * pointsMultiplier} {pointPlural} per tile, and an
                extra {1 * pointsMultiplier} {pointPlural} for each city chain.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
