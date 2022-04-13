import React from "react";
import WordRow from "./components/WordRow";

const App: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <header className="border-b border-gray-500 my-2 pb-2">
        <h1 className="font-bold text-6xl text-center">Wordle</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
        <WordRow letters="solar" />
        <WordRow letters="hello" />
        <WordRow letters="penny" />
        <WordRow letters="stare" />
        <WordRow letters="snack" />
        <WordRow letters="he" />
      </main>
    </div>
  );
};

export default App;
