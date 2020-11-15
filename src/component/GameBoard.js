import React from "react";
// import { minimax, checkWinner } from "../minimax";
// sunday doo
import "./GameBoard.css";
var human = "X";
var ai = "O";
var avialable = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];
const gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let count = 0;
function equal3(a, b, c) {
  return a === b && b === c;
}
const scores = {
  X: -10,
  O: 10,
  tie: 0,
};
function checkWinner() {
  let winner = "";
  for (let i = 0; i < 3; i++) {
    // horizontal
    if (equal3(gameboard[i][0], gameboard[i][1], gameboard[i][2])) {
      winner = gameboard[i][0];
    }
    // vertical
    if (equal3(gameboard[0][i], gameboard[1][i], gameboard[2][i])) {
      winner = gameboard[0][i];
    }
  }

  // diagonal
  if (equal3(gameboard[0][0], gameboard[1][1], gameboard[2][2])) {
    winner = gameboard[0][0];
  }
  if (equal3(gameboard[0][2], gameboard[1][1], gameboard[2][0])) {
    winner = gameboard[0][2];
  }

  if (winner === "" && avialable.length === 0) {
    return "tie";
  } else {
    return winner;
  }
}

function minimax(gameboard, depth, isMaximizing) {
  let w = checkWinner();
  if (w !== "") {
    return scores[w];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          gameboard[i][j] = ai;
          let score = minimax(gameboard, depth + 1, false);
          gameboard[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          gameboard[i][j] = human;
          let score = minimax(gameboard, depth + 1, true);
          gameboard[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

class GameBoard extends React.Component {
  state = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winner: "",
  };

  humanTurn(i, j) {
    // this.state.board[i][j] = this.state.chance ? "X" : "O";
    // **** check for overwriting AI moves
    let found_spot = avialable.findIndex(
      (spot) => spot[0] === i && spot[1] === j
    );
    if (found_spot != -1) {
      gameboard[i][j] = human;
      avialable.splice(found_spot, 1);
      this.setState({
        board: gameboard,
        winner: checkWinner(),
      });
    }
  }

  //minmax

  // ai player
  AITurn() {
    let bestMove;
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          gameboard[i][j] = ai;
          let score = minimax(gameboard, 0, false);
          gameboard[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    // console.log(count);
    count = 0;
    gameboard[bestMove.i][bestMove.j] = ai;
    avialable = avialable.filter(
      (spot) => spot[0] !== bestMove.i || spot[1] !== bestMove.j
    );

    this.setState({
      board: gameboard,
      winner: checkWinner(),
    });
  }

  // render board
  renderBoard() {
    return this.state.board.map((grid, i) => {
      return grid.map((g, j) => {
        return (
          <div
            className="board"
            onClick={
              g === ""
                ? () => {
                    if (!this.state.winner) {
                      this.humanTurn(i, j);
                      avialable.length !== 0 && this.AITurn();
                    }
                  }
                : null
            }
          >
            {g === human && <span>{human}</span>}
            {g === ai && <span>{ai}</span>}
          </div>
        );
      });
    });
  }
  render() {
    return (
      <div>
        <div className="game-board">{this.renderBoard()}</div>
        <p>{this.state.winner}</p>
        {/* <p>{thi}</p> */}
      </div>
    );
  }
}

export default GameBoard;
