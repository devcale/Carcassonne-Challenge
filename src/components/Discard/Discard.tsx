import { useEffect, useState } from 'react';
import { GiCardRandom } from 'react-icons/gi';

import { useGameStateContext } from '../../context/Context';
import { DealNewTile } from '../../utils/TileDealingUtils';
import Board from '../Board/Board';
import styling from './Discard.module.css';

export const Discard = () => {
  const {
    hand,
    setHand,
    cityCountdown,
    abbeyCountdown,
    discardCountdown,
    setDiscardCountdown,
    mapGlobal,
    gameMode,
  } = useGameStateContext();

  const discardHandTabIndex = 4;

  const discardIcon = <GiCardRandom />;

  const boardHelper = new Board(0, { type: '', variant: 0 }, { type: '', variant: 0 });

  function handleKeyDown() {
    //
  }

  function handleDiscard() {
    if (discardCountdown === 0) {
      const newRandoms = [
        DealNewTile(abbeyCountdown, cityCountdown, gameMode),
        DealNewTile(abbeyCountdown, cityCountdown, gameMode),
        DealNewTile(abbeyCountdown, cityCountdown, gameMode),
        DealNewTile(abbeyCountdown, cityCountdown, gameMode),
      ];
      const newHand: [
        [string, number],
        [string, number],
        [string, number],
        [string, number],
      ] = [...hand];
      newHand[0] = [newRandoms[0].tile.type, newRandoms[0].tile.variant];
      newHand[1] = [newRandoms[1].tile.type, newRandoms[1].tile.variant];
      newHand[2] = [newRandoms[2].tile.type, newRandoms[2].tile.variant];
      newHand[3] = [newRandoms[3].tile.type, newRandoms[3].tile.variant];

      setHand(newHand);
      setDiscardCountdown(5);
      boardHelper.checkGameEnd(newHand, mapGlobal, 5, gameMode);
    }
  }

  return (
    <div
      className={
        styling.discardHand +
        ' ' +
        styling[discardCountdown > 0 ? 'unavailable' : 'available']
      }
      role="button"
      onClick={handleDiscard}
      onKeyDown={handleKeyDown}
      tabIndex={discardHandTabIndex}
    >
      <div className={styling.discardText}>
        {discardCountdown > 0 ? discardCountdown : discardIcon}
      </div>
    </div>
  );
};
