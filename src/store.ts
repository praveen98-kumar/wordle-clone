import create from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getRandomWord, LetterState } from "./wordUtils";

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, _) => ({
      answer: getRandomWord(),
      rows: [],
      addGuess: (guess: string) => {
        set((state) => ({
          rows: [
            ...state.rows,
            {
              guess,
              result: computeGuess(guess, state.answer),
            },
          ],
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
        });
      },
    }),
    {
      name: "wordle",
    }
  )
);
