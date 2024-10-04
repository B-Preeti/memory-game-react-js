import React from 'react';

const Card = ({ value, onClick, isFlipped }) => {
  return (
    <div className="card" onClick={onClick}>
      {isFlipped ? value : '?'}
    </div>
  );
};

export default Card;
