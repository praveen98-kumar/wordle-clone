import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent } from "./test/utils";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

  test("show empty state", () => {
    useStore.getState().newGame([]);
    render(<App />);
    expect(screen.queryByText("Game Over")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  test("show one row of guesses", () => {
    useStore.getState().newGame(["hello"]);
    render(<App />);
    expect(document.querySelector("main")?.textContent).toEqual("hello");
  });

  test("show lost game over state", () => {
    useStore.getState().newGame(Array(6).fill("hello"));
    render(<App />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });

  test("show won game over state", () => {
    useStore.getState().newGame(Array(2).fill("hello"));
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);
    render(<App />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });

  test("can state a new game", () => {
    useStore.getState().newGame(Array(6).fill("hello"));
    render(<App />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
    userEvent.click(screen.getByText("New Game"));
    expect(document.querySelector("main")?.textContent).toEqual("");
  });
});
