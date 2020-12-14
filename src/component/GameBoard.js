import React from "react";

import { minimax, checkGameBoard, checkWinner } from "./minmax";
import { ReactComponent as ResetLogo } from "../image/reset.svg";
import "./GameBoard.css";
window.human = "X";
window.ai = "O";
window.gameboard = [];

class GameBoard extends React.Component {
  state = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winner: "",
  };
  componentDidMount() {
    this.reset();
  }

  reset = () => {
    window.gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.setState({
      board: window.gameboard,
      winner: "",
    });
  };
  humanTurn(i, j) {
    // this.state.board[i][j] = this.state.chance ? "X" : "O";
    // **** check for overwriting AI moves

    if (checkGameBoard(window.gameboard)) {
      window.gameboard[i][j] = window.human;
      this.setState({
        board: window.gameboard,
        winner: checkWinner(window.gameboard),
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
        if (window.gameboard[i][j] === "") {
          window.gameboard[i][j] = window.ai;
          let score = minimax(0, false);
          window.gameboard[i][j] = "";
          console.log(score, i, j);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    window.gameboard[bestMove.i][bestMove.j] = window.ai;

    this.setState({
      board: window.gameboard,
      winner: checkWinner(window.gameboard),
    });
  }

  // render board
  renderBoard() {
    return this.state.board.map((grid, i) => {
      return grid.map((g, j) => {
        return (
          <div
            className="board"
            key={i + j}
            onClick={
              g === ""
                ? () => {
                    if (!this.state.winner) {
                      this.humanTurn(i, j);
                      checkGameBoard(window.gameboard) && this.AITurn();
                    }
                  }
                : null
            }
          >
            {g === window.human && (
              <span className="human">{window.human}</span>
            )}
            {g === window.ai && <span className="ai">{window.ai}</span>}
          </div>
        );
      });
    });
  }
  render() {
    return (
      <div className="game-board">
        <div className="boards">{this.renderBoard()}</div>

        {this.state.winner && (
          <div>
            <div className="winner">
              {this.state.winner === window.human ? (
                <p>You won 🔥🔥!!!</p>
              ) : (
                <p>Try again to beat me 🤗</p>
              )}
            </div>
            <ResetLogo className="btn-reset" onClick={this.reset}>
              Reset
            </ResetLogo>
          </div>
        )}
        {/* <p>{thi}</p> */}
      </div>
    );
  }
}

export default GameBoard;
