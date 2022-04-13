import wordBank from "./wordbank.json";

export const getRandomWord = (): string => {
  const randomNumber = Math.floor(Math.random() * wordBank.valid.length);
  return wordBank.valid[randomNumber];
};

export enum LetterState {
  Miss,
  Present,
  Match,
}

export const computeGuess = (guess: string, answer: string) => {
  const result: LetterState[] = [];

  const guessArray = guess.split("");
  const answerArray = answer.split("");

  guessArray.forEach((letter, i) => {
    if (letter === answerArray[i]) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });
  return result;
};
