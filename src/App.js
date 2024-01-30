import React, { useState, useEffect } from 'react';
import './App.css';



const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [time, setTime] = useState(0);
  const [singlePlayerMode, setSinglePlayerMode] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const cardsData = [
    { id: 1, content: 'A' },
    { id: 2, content: 'B' },
    { id: 3, content: 'C' },
    { id: 4, content: 'D' },
    { id: 5, content: 'A' },
    { id: 6, content: 'B' },
    { id: 7, content: 'C' },
    { id: 8, content: 'D' },
    { id: 9, content: 'A' },
    { id: 10, content: 'B' },
    { id: 11, content: 'C' },
    { id: 12, content: 'D' },
    { id: 13, content: 'A' },
    { id: 14, content: 'B' },
    { id: 15, content: 'C' },
    { id: 16, content: 'D' },
  ];

  const [cards, setCards] = useState(shuffleArray(cardsData));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);



  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => checkForMatch(), 500);
    }
  }, [flippedCards]);
  

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id)) {
      setFlippedCards([...flippedCards, id]);
    }
  };

  

  const checkForMatch = () => {
    const [firstCard, secondCard] = flippedCards;
    if (cards[firstCard - 1].content === cards[secondCard - 1].content) {
      setMatchedCards([...matchedCards, firstCard, secondCard]);
      updateScore();
    }
    setFlippedCards([]);
    switchPlayers();
  };
  
  

  const updateScore = () => {
    if (currentPlayer === 1) {
      setPlayer1Score(player1Score + 1);
    } else {
      setPlayer2Score(player2Score + 1);
    }
  };

  const switchPlayers = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setCards(shuffleArray(cardsData));
    setFlippedCards([]);
    setMatchedCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="score">
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
        <p>Time: {time}s</p>
        <div className="difficulty-buttons">
        <button onClick={() => setDifficulty('easy')}>Easy</button>
        <button onClick={() => setDifficulty('medium')}>Medium</button>
        <button onClick={() => setDifficulty('hard')}>Hard</button></div>
      </div>
      <div className="mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={singlePlayerMode}
            onChange={() => setSinglePlayerMode(!singlePlayerMode)}
          />
          Single Player Mode
        </label>
      </div>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card card-${index + 1} ${
              flippedCards.includes(index + 1) || matchedCards.includes(index + 1) ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(index + 1)}
          >
            {flippedCards.includes(index + 1) || matchedCards.includes(index + 1) ? card.content : '?'}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
    
  );
};

export default App;
