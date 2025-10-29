// ✅ Check if a number can be placed at (row, col)
function isValid(board, row, col, num) {
  // Row & Column check
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  // 3x3 Subgrid check
  const rn = 3;
  const startRow = row - (row % rn);
  const startCol = col - (col % rn);

  for (let x = startRow; x < startRow + rn; x++) {
    for (let y = startCol; y < startCol + rn; y++) {
      if (board[x][y] === num) {
        return false;
      }
    }
  }

  return true;
}
function isBoardValid(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let num = board[row][col];
      if (num !== 0) {
        board[row][col] = 0; // temporarily clear
        if (!isValid(board, row, col, num)) {
          return false;
        }
        board[row][col] = num; // restore
      }
    }
  }
  return true;
}

// ✅ Recursive Sudoku Solver
function sudokuSolver(board, row, col) {
  if (row === 9) {
    return true; // solved
  }

  if (col === 9) {
    return sudokuSolver(board, row + 1, 0);
  }

  if (board[row][col] !== 0) {
    return sudokuSolver(board, row, col + 1);
  }

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (sudokuSolver(board, row, col + 1)) {
        return true;
      }

      // backtrack
      board[row][col] = 0;
    }
  }

  return false;
}

// ✅ Reads Sudoku from HTML and solves it
function solveSudoku() {
  const board = [];
  const given = [];

  // Read values from HTML grid
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    given[i] = [];
    for (let j = 0; j < 9; j++) {
      let idd = "rc" + i + j;
      let cell = document.getElementById(idd);
      let value = parseInt(cell.value) || 0;
      board[i][j] = value;
      given[i][j] = value != 0;
    }
  }
  if (!isBoardValid(board)) {
    alert("❌ Invalid Sudoku input (conflict in row/col/box).");
    return;
  }

  if (sudokuSolver(board, 0, 0)) {
    alert("Sudoku Solved!");
    // Write solved board back to HTML
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let idd = "rc" + i + j;
        let cell = document.getElementById(idd);
        cell.value = board[i][j];
        if (given[i][j]){
        cell.style.fontWeight = "bold";
        cell.style.color  = "blue";
      }else{
        cell.style.fontWeight = "normal";
        cell.style.color = "black";
      }
      }
      
    }
  } else {
    alert("no soluiton exist for this soduko");
  }
  return;
}

// ✅ Reset function
function resetSoduko() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let idd = "rc" + i + j;
      document.getElementById(idd).value = "";
    }
  }
}
