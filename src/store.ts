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

        set(() => ({
          rows,
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
        gameState: "playing",
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            rows: [],
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
