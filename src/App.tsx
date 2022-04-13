import React from "react";
import WordRow from "./components/WordRow";

const App: React.FC = () => {
  return (
    <div className="w-96 mx-auto">
      <header className="border-b border-gray-500 my-2 pb-2">
        <h1 className="font-bold text-6xl text-center">Wordle</h1>
      </header>

      <main>
        <WordRow letters="hel" />
        <WordRow letters="hell" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
};

export default App;
