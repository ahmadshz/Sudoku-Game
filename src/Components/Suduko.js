import React, { useContext, useState } from 'react';
import './Sudoku.css';
import { validateBoard } from './validateBoard';  // Import the validateBoard function
import { generatePuzzle } from './generatePuzzle';  // Import the generatePuzzle function
import { IsDarkMode } from '../Context/DakMode';
import { CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const SudokuBoard = () => {
  // Initialize the board with empty values and set other states
  const initialBoard = Array(9).fill(Array(9).fill(''));
  const initialConflictState = Array(9).fill(Array(9).fill(false));
  const initialUserInputs = Array.from({ length: 9 }, () => Array(9).fill(false));

  const [board, setBoard] = useState(initialBoard);
  const [solution, setSolution] = useState(initialBoard);
  const [conflicts, setConflicts] = useState(initialConflictState);
  const [isValid, setIsValid] = useState(true);
  const [show, setShow] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [userInputs, setUserInputs] = useState(initialUserInputs);

  //theme Context 
  const { darkMode } = useContext(IsDarkMode);

  // Handle user input
  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) { // Allow only valid numbers (1-9)
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);

      const newUserInputs = [...userInputs];
      newUserInputs[row][col] = value !== ''; // Mark input as filled
      setUserInputs(newUserInputs);
    }
  };

  // Check for conflicts and validate the board
  const checkSolution = () => {
    const { isValid, conflicts } = validateBoard(board);  // Use the updated validateBoard function
    setIsValid(isValid);
    setConflicts(conflicts);
    setShow(true);
  };

  // Generate a new puzzle based on difficulty
  const generateNewPuzzle = () => {
    const { board: newBoard, solution: newSolution } = generatePuzzle(difficulty);
    setBoard(newBoard);
    setSolution(newSolution);
    setConflicts(initialConflictState);
    setIsValid(true);
    setShow(false);
    setUserInputs(initialUserInputs);
  };

  // Reveal a hint (fill in the first empty cell with the correct solution)
  const revealHint = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '') {
          const newBoard = [...board];
          newBoard[row][col] = solution[row][col];
          setBoard(newBoard);
          const newUserInputs = [...userInputs];
          newUserInputs[row][col] = true;
          setUserInputs(newUserInputs);
          return;
        }
      }
    }
  };

  return (
    <div>
      <div className={`container ${darkMode ? 'containerDark' : ''}`}>

       <Link to='/' className='logout'>
       <CgLogOut />
       </Link>
        {/* Sudoku Board */}
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  value={cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  maxLength={1}
                  className={`sudoku-cell ${conflicts[rowIndex][colIndex] ? 'conflict' : ''}`} // Highlight conflicts
                  disabled={cell !== '' && !userInputs[rowIndex][colIndex]} // Disable pre-filled cells
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          {/* Difficulty Selector */}
          <div className="level">
            <label style={{ fontSize: '20px' }}>Select Difficulty: </label>
            <select style={{ padding: 5, fontSize: 16 }} className="select" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className='content-btn'>
            {/* Generate Puzzle  */}
            <button onClick={generateNewPuzzle}>Generate New Puzzle</button>


            {/* Check Solution Button */}
            <button onClick={checkSolution}>Check Solution</button>

            {/* Hint Button */}
            <button onClick={revealHint}>Hint</button>
          </div>
          {/* Validation Feedback */}
          {show && (
            isValid ? (
              <h3 style={{ color: 'green' }}>The solution is valid!</h3>
            ) : (
              <h3 style={{ color: 'red' }}>There are conflicts in the board! Please fix them.</h3>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SudokuBoard;
