import './App.css';
import React from "react";
import Home from './bingo-game/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Buzzword Bingo
        </p>
      </header>
      <div>
        <Home/>
      </div>
    </div>
  );
}

export default App;
