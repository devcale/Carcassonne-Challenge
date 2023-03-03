import { useGameStateContext } from '../../context/Context';
import styling from './Discard.module.css';

export const Discard = () => {
  const { hand, setHand, discardCountdown, setDiscardCountdown } = useGameStateContext();

  const discardHandTabIndex = 4;

  function handleKeyDown() {
    //
  }

  function handleDiscard() {
    if (discardCountdown === 0) {
      const newRandoms = [
        getRandomCard(),
        getRandomCard(),
        getRandomCard(),
        getRandomCard(),
      ];
      const newHand: [
        [string, number],
        [string, number],
        [string, number],
        [string, number],
      ] = [...hand];
      newHand[0] = newRandoms[0];
      newHand[1] = newRandoms[1];
      newHand[2] = newRandoms[2];
      newHand[3] = newRandoms[3];

      setHand(newHand);
      setDiscardCountdown(5);
    }
  }

  function getRandomCard(): [string, number] {
    const rand = Math.random();

    let newCard = '';
    const variation = Math.floor(Math.random() * 3);
    if (rand > 0.4) {
      newCard = 'road';
    } else if (rand <= 0.4 && rand > 0.1) {
      newCard = 'city';
    } else if (rand <= 0.1) {
      newCard = 'abbey';
    }
    return [newCard, variation];
  }
  return (
    <div
      className={styling.discardHand}
      role="button"
      onClick={handleDiscard}
      onKeyDown={handleKeyDown}
      tabIndex={discardHandTabIndex}
    >
      {'Discard Hand ' + '(' + discardCountdown + ')'}
    </div>
  );
};
