import React from "react";
import { useStore } from "../store";
import { computeGuess, LETTER_LENGTH } from "../wordUtils";
import CharacterBox from "./CharacterBox";

interface WordRowProps {
  letters: string;
}

const WordRow: React.FC<WordRowProps> = ({ letters: letterProps }) => {
  const answer = useStore((state) => state.answer);
  const letterRemaining = LETTER_LENGTH - letterProps.length;
  const letters = letterProps.split("").concat(Array(letterRemaining).fill(""));

  const guessStates = computeGuess(letterProps, answer);
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
