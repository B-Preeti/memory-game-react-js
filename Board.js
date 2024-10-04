import React, { useState, useEffect } from 'react';
import Card from './Card';

const generateCards = () => {
  const values = Array.from({ length: 8 }, (_, i) => i + 1);
  const cardValues = [...values, ...values];
  return cardValues.sort(() => Math.random() - 0.5);
};

const Board = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [bestScore, setBestScore] = useState(Infinity);

  useEffect(() => {
    if (matchedIndices.length === cards.length) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      if (timeTaken < bestScore) {
        setBestScore(timeTaken);
      }
      alert(`Game Over! Time taken: ${timeTaken} seconds`);
      resetGame();
    }
  }, [matchedIndices]);

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setStartTime(Date.now());
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
      setFlippedIndices((prev) => [...prev, index]);

      if (flippedIndices.length === 1) {
        const firstIndex = flippedIndices[0];
        if (cards[firstIndex] === cards[index]) {
          setMatchedIndices((prev) => [...prev, firstIndex, index]);
        }
        setMoves((prev) => prev + 1);

        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <h2>Memory Game</h2>
      <h3>Moves: {moves}</h3>
      <h3>Best Time: {bestScore === Infinity ? 'N/A' : bestScore + ' seconds'}</h3>
      <div className="board">
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
