import React from "react";
import { computeGuess } from "../wordUtils";
import CharacterBox from "./CharacterBox";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

const WordRow: React.FC<WordRowProps> = ({ letters: letterProps }) => {
  const letterRemaining = LETTER_LENGTH - letterProps.length;
  const letters = letterProps.split("").concat(Array(letterRemaining).fill(""));

  const guessStates = computeGuess(letterProps);
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox
          key={char + index}
          value={char}
          state={guessStates[index]}
        />
      ))}
    </div>
  );
};

export default WordRow;
