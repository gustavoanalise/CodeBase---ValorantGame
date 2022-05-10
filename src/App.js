//CSS
import './App.css';
//React
import { useCallback, useState, useEffect } from 'react';
//data
import { wordsList } from './data/words'
//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game"},
  { id: 3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);  
  
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = useCallback(() => {
    // selecionar categoria aleatória 
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // selecionar palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    // console.log(word)

    return { word, category };
  }, [words]);

  // Começando o jogo
  const startGame = useCallback(() => {
    // limpar as letras
    clearLetterStates();

    // pickedWord e pickCategory
    const { word, category } = pickedWordAndCategory();

    // criando um array das letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // console.log(word, category)
    // console.log(wordLetters)

    // setar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    
    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  // Processar a letra de entrada
  const verifyLetter = (letter) => {
    // console.log(letter)

    const newLocal = letter.toLowerCase();
    const normalizedLetter = newLocal;

    // checar se a letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // checar a vitória
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    // condição de vitória
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add pontuação
      setScore((actualScore) => actualScore += 100)

      // restar do jogo
      startGame();
    }

  }, [guessedLetters, letters, startGame, gameStage])

  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates()
      
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // Reiniciar o jogo
  const retry = () => {
    setScore(0)

    setGuesses(5)

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
