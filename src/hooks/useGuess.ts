import React, { useEffect, useState } from "react";
import { LETTER_LENGTH } from "../wordUtils";

const useGuess = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] => {
  const [guess, setGuess] = useState("");
  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess = letter.length === 1 ? curGuess + letter : curGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === LETTER_LENGTH) {
            return "";
          }
      }

      if (curGuess.length === LETTER_LENGTH) {
        return newGuess;
      }
      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
};

export default useGuess;
