import React, { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import WordRow from "./components/WordRow";
import useGuess from "./hooks/useGuess";
import usePrevious from "./hooks/usePrevious";
import { useStore } from "./store";
import { isValidWord, LETTER_LENGTH } from "./wordUtils";

export const GUESS_COUNT = 6;

const App: React.FC = () => {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState<boolean>(false);
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  let rows = [...state.rows];
  let currentRow = 0;
  if (rows.length < GUESS_COUNT) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = GUESS_COUNT - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill({ guess: "" }));

  const isGameOver = state.gameState !== "playing";

  return (
    <div className="w-96 relative mx-auto">
      <header className="border-b border-gray-500 my-2 pb-2">
        <h1 className="font-bold text-6xl text-center">Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, i) => {
          return (
            <WordRow
              letters={word.guess}
              key={i + word.guess}
              result={word.result}
              className={
                showInvalidGuess && currentRow === i ? "animate-bounce" : ""
              }
            />
          );
        })}
      </main>
      <Keyboard onClick={(letter) => addGuessLetter(letter)} />
      {isGameOver && (
        <div
          role={"modal"}
          className="absolute bg-white top-1/4 p-6 w-3/4 mx-auto rounded border border-gray-500 left-0 right-0 text-center"
        >
          <WordRow
            letters={state.answer}
            className="items-center justify-items-center mb-2"
          />
          Game Over
          <button
            onClick={() => {
              state.newGame(), setGuess("");
            }}
            className="block mx-auto bg-green-400 rounded px-3 py-2 mt-2 shadow hover:bg-green-500 transition duration-300"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
