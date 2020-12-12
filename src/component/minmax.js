const scores = {
  X: -10,
  O: 10,
  tie: 0,
};

export function minimax(depth, isMaximizing) {
  let w = checkWinner(window.gameboard);
  if (w !== "") {
    return scores[w];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (window.gameboard[i][j] === "") {
          window.gameboard[i][j] = window.ai;
          let score = minimax(depth + 1, false);
          window.gameboard[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (window.gameboard[i][j] === "") {
          window.gameboard[i][j] = window.human;
          let score = minimax(depth + 1, true);
          window.gameboard[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

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

  if (winner === "" && !checkGameBoard(gameboard)) {
    return "tie";
  } else {
    return winner;
  }
}
export function checkGameBoard(gameboard) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameboard[i][j] === "") {
        return true;
      }
    }
  }
  return false;
}

function equal3(a, b, c) {
  return a === b && b === c;
}
