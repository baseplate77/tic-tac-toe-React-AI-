import React from "react";
import GameBoard from "./GameBoard";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="title">tic tac toe</div>
      <GameBoard />
    </div>
  );
}
