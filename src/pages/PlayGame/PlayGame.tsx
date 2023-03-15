import { useEffect } from 'react';

import { BoardComponent } from '../../components/Board/BoardComponent';
import { Discard } from '../../components/Discard/Discard';
import { Hand } from '../../components/Hand/Hand';
import { EndGameModal } from '../../components/Modal/EndGameModal';
import { Points } from '../../components/Points/Points';
import { useGameStateContext } from '../../context/Context';
import { DealNewTile } from '../../utils/TileDealingUtils';
import styling from './PlayGame.module.css';

export const PlayGame = () => {
  const {
    gameHasEnded,
    abbeyCountdown,
    cityCountdown,
    gameMode,
    setHand,
    setPoints,
    setDiscardCountdown,
    setAbbeyCountdown,
    setCityCountdown,
    setGameHasEnded,
  } = useGameStateContext();

  const handleClose = () => setGameHasEnded(false);

  useEffect(() => {
    setGameHasEnded(false);
    setDiscardCountdown(5);
    setAbbeyCountdown(15);
    setCityCountdown([12, 13, 14]);
    setPoints(0);
    const newTiles = [
      DealNewTile(abbeyCountdown, cityCountdown, gameMode),
      DealNewTile(abbeyCountdown, cityCountdown, gameMode),
      DealNewTile(abbeyCountdown, cityCountdown, gameMode),
      DealNewTile(abbeyCountdown, cityCountdown, gameMode),
    ];
    setHand([
      [newTiles[0].tile.type, newTiles[0].tile.variant],
      [newTiles[1].tile.type, newTiles[1].tile.variant],
      [newTiles[2].tile.type, newTiles[2].tile.variant],
      [newTiles[3].tile.type, newTiles[3].tile.variant],
    ]);
  }, []);
  return (
    <div className={styling.playgame}>
      <EndGameModal openModal={gameHasEnded} closeModal={handleClose} />

      <div className={styling.playArea}>
        <div className={styling.handContainer}>
          <Hand />
          <Discard />
        </div>

        <div className={styling.boardContainer}>
          <BoardComponent />
        </div>
        <div className={styling.pointsContainer}>
          <Points />
        </div>
      </div>
    </div>
  );
};
