import create from "zustand";
import { persist } from "zustand/middleware";
import { getRandomWord } from "./wordUtils";

interface StoreState {
  answer: string;
  guesses: string[];
  addGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      answer: getRandomWord(),
      guesses: ["hello", "solar", "penny"],
      addGuess: (guess: string) => {
        set((state) => ({
          guesses: [...state.guesses, guess],
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          guesses: [],
        });
      },
    }),
    {
      name: "wordle",
    }
  )
);
