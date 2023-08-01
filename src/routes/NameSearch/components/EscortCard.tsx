import './EscortCard.scss';

import React from 'react';

interface EscortCardParams {
    name: string,
    table: string;
}

function EscortCard({name, table}: EscortCardParams): JSX.Element {
  // In a perfect world, the table number text would automatically resize.
  // But we really only care that it is visble and in the bounds.
  // Anything that is not a number should be smaller.
  let tableTextSize = 1;
  if (Number.isNaN(parseInt(table))) {
    tableTextSize = 3;
  }

  return (
    <div className="escort-card xs-y-margin-between-8">
      <p className="name is-size-3">{name}+test</p>
      <div className="table-info">
        <p className="table-text is-size-8">Table</p>
        <p className={`table-number is-size-${tableTextSize}`}>{table}</p>
      </div>
    </div>
  );
}

export default EscortCard;
