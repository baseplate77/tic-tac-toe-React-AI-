import React from "react";
import GameBoard from "./GameBoard";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="title">tic tac toe</div>
      <GameBoard />
      <div className="footer">
        Made By Nayan{" "}
        <a href="https://github.com/baseplate77/tic-tac-toe-React-AI-">
          Github
        </a>
      </div>
    </div>
  );
}
