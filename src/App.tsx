import React from "react";
import WordRow from "./components/WordRow";
import useGuess from "./hooks/useGuess";
import { useStore } from "./store";

export const GUESS_COUNT = 6;

const App: React.FC = () => {
  const state = useStore();
  const [guess, setGuess] = useGuess();

  let rows = [...state.rows];

  if (rows.length < GUESS_COUNT) {
    rows.push({ guess });
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
            />
          );
        })}
      </main>

      {isGameOver && (
        <div
          role={"modal"}
          className="absolute bg-white top-1/4 p-6 w-3/4 mx-auto rounded border border-gray-500 left-0 right-0 text-center"
        >
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
