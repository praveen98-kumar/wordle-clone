import React from "react";
import { LetterState } from "../wordUtils";

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ value, state }) => {
  const stateStyle = state == null ? "" : characterStateStyles[state];
  return (
    <span
      className={`border-2 text-center font-extrabold text-4xl p-2 uppercase ${stateStyle}`}
    >
      {value}
    </span>
  );
};

const characterStateStyles: Record<number, string> = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
  [LetterState.Match]: "bg-green-500 border-green-500",
};

export default CharacterBox;
