import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,  
  score
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    verifyLetter(letter)

    setLetter("");

    letterInputRef.current.focus();
  }

  return (
    <div className='game'>
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Essa palavra é um(a): <span>{pickedCategory}</span>
      </h3>
      <p>Ainda restam {guesses} tentativas!</p>

      <div className="wordContainer borderContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span className='letter' key={i}>{letter}</span>
          ) : (
              <span className="blankSquare" key={i}></span>
          )
        ))}
      </div>

      <div className="letterContainer">
        <p>Adivinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name='letter' maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button onClick={verifyLetter}>Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>

      
    </div>
  )
}

export default Game