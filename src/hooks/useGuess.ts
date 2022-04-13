import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import { LETTER_LENGTH } from "../wordUtils";
import usePrevious from "./usePrevious";

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [guess, setGuess] = useState("");
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
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
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);
  return [guess, setGuess];
};

export default useGuess;
