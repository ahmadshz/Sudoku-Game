// sudokuGenerator.js
const generatePuzzle = (difficulty) => {
  const board = generateFullBoard();
  const solution = JSON.parse(JSON.stringify(board)); // Create a copy of the solved board as the solution
  removeCells(board, difficulty);
  return { board, solution }; // Return both the puzzle and the solution
};

const generateFullBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(''));
  if (fillBoard(board)) {
    return board;
  }
  return generateFullBoard(); // Retry if filling fails
};

const fillBoard = (board) => {
  const findEmptyCell = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '') {
          return { row, col };
        }
      }
    }
    return null; // All cells are filled
  };

  const isSafe = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const solve = () => {
    const emptyCell = findEmptyCell();
    if (!emptyCell) return true; // No empty cells left, puzzle is solved

    const { row, col } = emptyCell;
    const numbers = ['1','2','3','4','5','6','7','8','9'];
    shuffleArray(numbers); // Shuffle the numbers array

    for (let num of numbers) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solve()) return true;
        board[row][col] = ''; // Backtrack
      }
    }
    return false;
  };

  return solve();
};

const removeCells = (board, difficulty) => {
  const totalCells = 81;
  let cellsToRemove;

  if (difficulty === 'easy') cellsToRemove = 30;
  else if (difficulty === 'medium') cellsToRemove = 45;
  else if (difficulty === 'hard') cellsToRemove = 60;

  let count = 0;
  while (count < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== '') {
      board[row][col] = '';
      count++;
    }
  }
};



export { generatePuzzle };
