import './PlayableTile.css';

import { useEffect, useState } from 'react';

import { useGameStateContext } from '../../helper/Context';

export const PlayableTile = (props: any) => {
  const { currentTile, setCurrentTile } = useGameStateContext();
  const [description, setDescription] = useState('');
  function configureDescription(): string {
    let desc = '';
    if (props.type === 'city') {
      desc =
        'Cities gives you two points per tile, and an extra point for each city chain.';
    } else if (props.type === 'abbey') {
      desc = 'Abbeys give you one point for each tile that surrounds it.';
    } else if (props.type === 'road') {
      desc = 'Roads give you one point per tile.';
    }
    return desc;
  }

  function handleClick(): void {
    setCurrentTile(props.handIndex);
    document.documentElement.style.setProperty(
      '--cell-hover',
      'url(' + selectImage(props.type) + ')',
    );
    console.log(document.documentElement.style.getPropertyValue('--cell-hover'));
  }

  function selectImage(type: string): string {
    let selectedImage = '';
    if (type === 'city') {
      selectedImage = "'./assets/images/city-a.png'";
    } else if (type === 'road') {
      selectedImage = "'./assets/images/road-f.png'";
    } else if (type === 'abbey') {
      selectedImage = "'./assets/images/abbey2-a.png'";
    }
    return selectedImage;
  }

  useEffect(() => {
    setDescription(configureDescription);
  }, []);
  return (
    <div
      className={'playable-tile '}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={props.handIndex + 1}
    >
      <div className="tile-card-info">
        <div className="tile-card-title">{props.type}</div>
        <div className="tile-card-description">{description}</div>
      </div>

      <div className="playable-img-container">
        <div className={'playable-img-' + props.type}> </div>
      </div>
    </div>
  );
};
