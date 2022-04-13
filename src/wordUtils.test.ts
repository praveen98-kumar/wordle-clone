import { expect, describe, test } from "vitest";
import { computeGuess, getRandomWord, LetterState } from "./wordUtils";

describe("getRandomWord", () => {
  test("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  test("work with match and present", () => {
    expect(computeGuess("boost", "basic")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });
  test("work with all matches", () => {
    expect(computeGuess("boost", "boost")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });
  test("work with full miss", () => {
    expect(computeGuess("guard", "boost")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
  test("only does one match when two letters are present", () => {
    expect(computeGuess("solid", "boost")).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
  test("returns empty array when given incomlete guess", () => {
    expect(computeGuess("so", "smelt")).toEqual([]);
  });
  test("when 2 letters are present but answer has only 1 of the letter", () => {
    expect(computeGuess("allow", "smelt")).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
  test("when 1 letter matches but guess has more of the same letter", () => {
    expect(computeGuess("allol", "color")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });
});
