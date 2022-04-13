import wordBank from "./wordbank.json";

export const getRandomWord = (): string => {
  const randomNumber = Math.floor(Math.random() * wordBank.valid.length);
  return wordBank.valid[randomNumber];
};
