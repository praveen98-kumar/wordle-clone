import React, { useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store";
import { LETTER_LENGTH } from "./wordUtils";

const GUESS_COUNT = 6;

const App: React.FC = () => {
  const state = useStore();
  const [guess, setGuess] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }
    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_COUNT) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_COUNT - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  return (
    <div className="w-96 mx-auto">
      <header className="border-b border-gray-500 my-2 pb-2">
        <h1 className="font-bold text-6xl text-center">Wordle</h1>
      </header>
      <input
        className="w-1/2 border-2 border-gray-600 p-2 my-2"
        value={guess}
        onChange={onChange}
      />
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, i) => {
          return <WordRow letters={word} key={i + word} />;
        })}
      </main>
    </div>
  );
};

export default App;
