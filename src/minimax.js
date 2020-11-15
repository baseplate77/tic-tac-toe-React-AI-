function equal3(a, b, c) {
  return a === b && b === c;
}
const scores = {
  X: -10,
  O: 10,
  tie: 0,
};
export function checkWinner(gameboard) {
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

  if (winner === "" && window.avialable.length === 0) {
    return "tie";
  } else {
    return winner;
  }
}

export function minimax(gameboard, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== "") {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          gameboard[i][j] = window.ai;
          let score = minimax(gameboard, depth + 1, false);
          gameboard[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameboard[i][j] === "") {
          gameboard[i][j] = window.human;
          let score = minimax(gameboard, depth + 1, true);
          gameboard[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
