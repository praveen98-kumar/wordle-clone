import React from "react";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

interface CharacterBoxProps {
  value: string;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ value }) => (
  <span className="border-2 text-center font-extrabold text-4xl p-2 uppercase">
    {value}
  </span>
);

const WordRow: React.FC<WordRowProps> = ({ letters: letterProps }) => {
  const letterRemaining = LETTER_LENGTH - letterProps.length;
  const letters = letterProps.split("").concat(Array(letterRemaining).fill(""));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox key={char + index} value={char} />
      ))}
    </div>
  );
};

export default WordRow;
