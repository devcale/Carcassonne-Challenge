import './PlayableTile.css';

import React, { useEffect, useState } from 'react';

export const PlayableTile = (props: any) => {
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
  useEffect(() => {
    setDescription(configureDescription);
  }, []);
  return (
    <div className="playable-tile">
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
