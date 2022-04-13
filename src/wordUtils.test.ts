import { expect, describe, test } from "vitest";
import { getRandomWord } from "./wordUtils";

describe("word-utils", () => {
  test("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
