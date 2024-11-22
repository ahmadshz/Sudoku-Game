export const validateBoard = (board) => {
  let isValid = true;
  const conflicts = Array.from({ length: 9 }, () => Array(9).fill(false)); // تهيئة مصفوفة التعارضات

  // التحقق من صحة الصفوف والأعمدة
  for (let row = 0; row < 9; row++) {
    const rowNumbers = new Map();
    const colNumbers = new Map();

    for (let col = 0; col < 9; col++) {
      const rowValue = board[row][col];
      const colValue = board[col][row];

      // التحقق من التكرارين في الصف
      if (rowValue !== '') {
        rowNumbers.set(rowValue, (rowNumbers.get(rowValue) || 0) + 1);
        if (rowNumbers.get(rowValue) === 2) {
          conflicts[row].forEach((_, c) => {
            if (board[row][c] === rowValue) {
              conflicts[row][c] = true;
            }
          });
          isValid = false;
        }
      }

      // التحقق من التكرارين في العمود
      if (colValue !== '') {
        colNumbers.set(colValue, (colNumbers.get(colValue) || 0) + 1);
        if (colNumbers.get(colValue) === 2) {
          conflicts.forEach((_, r) => {
            if (board[r][row] === colValue) {
              conflicts[r][row] = true;
            }
          });
          isValid = false;
        }
      }
    }
  }

  // التحقق من صحة الشبكات الفرعية 3x3
  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const subgridNumbers = new Map();
      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          const value = board[row][col];
          if (value !== '') {
            subgridNumbers.set(value, (subgridNumbers.get(value) || 0) + 1);
            if (subgridNumbers.get(value) === 2) {
              for (let r = startRow; r < startRow + 3; r++) {
                for (let c = startCol; c < startCol + 3; c++) {
                  if (board[r][c] === value) {
                    conflicts[r][c] = true;
                  }
                }
              }
              isValid = false;
            }
          }
        }
      }
    }
  }

  return { isValid, conflicts };
};
