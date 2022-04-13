import React from "react";
import { LetterState, LETTER_LENGTH } from "../wordUtils";
import CharacterBox from "./CharacterBox";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

const WordRow: React.FC<WordRowProps> = ({
  letters: letterProps,
  result = [],
  className = "",
}) => {
  const letterRemaining = LETTER_LENGTH - letterProps.length;
  const letters = letterProps.split("").concat(Array(letterRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={char + index} value={char} state={result[index]} />
      ))}
    </div>
  );
};

export default WordRow;
