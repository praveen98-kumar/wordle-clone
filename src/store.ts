import create from "zustand";
import { persist } from "zustand/middleware";
import { GUESS_COUNT } from "./App";
import { computeGuess, getRandomWord, LetterState } from "./wordUtils";

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame: (initialRows?: string[]) => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer);

        const didWin = result.every((i) => i === LetterState.Match);

        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];

        const keyboardLetterState = get().keyboardLetterState;

        result.forEach((r, i) => {
          const resultGuessLetter = guess[i];

          const currentLetterState = keyboardLetterState[resultGuessLetter];

          switch (currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set(() => ({
          rows,
          keyboardLetterState,
          gameState: didWin
            ? "won"
            : rows.length === GUESS_COUNT
            ? "lost"
            : "playing",
        }));
      };

      return {
        answer: getRandomWord(),
        rows: [],
        keyboardLetterState: {},
        gameState: "playing",
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            rows: [],
            keyboardLetterState: {},
            gameState: "playing",
          });

          initialRows.forEach(addGuess);
        },
      };
    },
    {
      name: "wordle",
    }
  )
);
