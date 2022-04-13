import React from "react";
import { useStore } from "../store";
import { LetterState } from "../wordUtils";

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "p", "Backspace"],
];

const keyStatesStyle = {
  [LetterState.Miss]: "bg-gray-500",
  [LetterState.Present]: "bg-yellow-500",
  [LetterState.Match]: "bg-green-500",
};

interface KeyboardProps {
  onClick: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onClick }) => {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent as string;
    onClick(letter);
  };
  return (
    <div className="flex flex-col space-y-1 mt-4">
      {keyboardKeys.map((row, rowIndex) => (
        <div className="flex justify-center space-x-1" key={rowIndex}>
          {row.map((key, index) => {
            const letterState = keyStatesStyle[keyboardLetterState[key]];

            let style = `flex-1 py-2 font-bold uppercase rounded ${
              letterState
                ? letterState
                : key !== ""
                ? "bg-gray-500"
                : "pointer-event-none"
            }`;

            return (
              <button key={index} onClick={onButtonClick} className={style}>
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
