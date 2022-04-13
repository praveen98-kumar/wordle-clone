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

  if (guess.length !== answer.length) return [];

  const guessArray = guess.split("");

  const answerArray = answer.split("");

  const answerLetterCount: Record<string, number> = {};

  guessArray.forEach((letter, i) => {
    const currentAnswerLetter = answer[i];

    answerLetterCount[currentAnswerLetter] = answerLetterCount[
      currentAnswerLetter
    ]
      ? answerLetterCount[currentAnswerLetter] + 1
      : 1;

    if (currentAnswerLetter === letter) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });

  result.forEach((cur, i) => {
    if (cur !== LetterState.Present) {
      return;
    }

    const guessLetter = guessArray[i];

    answerArray.forEach((currAnswerLetter, ansIndex) => {
      if (currAnswerLetter !== guessLetter) return;

      if (result[ansIndex] === LetterState.Match) {
        result[i] = LetterState.Miss;
      }

      if (answerLetterCount[guessLetter] <= 0) {
        result[i] = LetterState.Miss;
      }
    });

    answerLetterCount[guessLetter]--;
  });
  return result;
};
