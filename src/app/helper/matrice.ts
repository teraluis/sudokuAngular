import { Square } from './square';
import {Validation} from './validation';

export class Matrice implements Validation {
  sudoku: number[][];
  constructor(sudoku: number[][]) {
    if (this.isValidSudoku(sudoku)) {
      this.sudoku = sudoku;
    } else {
      throw new Error('Le sudoku fourni est invalide');
    }
  }

  inColumn(n: number, colNumber: number): boolean {
    let count = 0;
    for (const line of this.sudoku) {
      if (n === line[colNumber]) { ++count; }
    }
    return (count > 0);
  }

  inLine(n: number, lineNumber: number): boolean {
    const lineTab = this.sudoku[lineNumber];
    const count = lineTab.reduce( (acc, cur) => {
      if (cur === n) { acc += 1; }
      return acc;
    }, 0);
    return (count > 0);
  }

  inSquare(n: number, square: Square): boolean {
    const tabSquare = [];
    let lineNumber = 0;
    for (const line of this.sudoku) {
      const cloneLine = line.slice(square.originX, square.originX + 3);
      if (lineNumber >= square.originY && lineNumber < square.originY + 3) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < cloneLine.length; i++) {
          tabSquare.push(cloneLine[i]);
        }
      }
      lineNumber += 1;
    }
    if (tabSquare.length !== 9 ) { return true; }
    return this.inArray(n, tabSquare);
  }

  isValidLine(a: Array<number>): boolean {
    return (a.length === 9);
  }

  isValidSudoku(matrice: Array<Array<number>>): boolean {
    let count = 0;
    for (const line of matrice) {
      if (!this.isValidLine(line)) { return false; }
      count++;
    }
    return (count === 9);
  }

  inArray(n: number, tab: number[]) {
    return tab.filter((x) => x === n).length > 0;
  }

  testValue(n: number, line: number, col: number): string {
    let message = '';
    const square = new Square(col, line);
    const inLine = this.inLine(n, line);
    const inColumn = this.inColumn(n, col);
    if (inLine) { message += ` Le chiffre ${n} est deja present sur la ligne. \r\n` ; }
    if (inColumn) { message += ` Le chiffre ${n} est deja present sur la colonne. \r\n`; }
    if (this.inSquare(n, square)) { message += ` Le chiffre ${n} est déjà present dans le carre. \r\n`; }
    return message;
  }

  /*
    This sudoku solution only uses sudoku rules to make the sudoku
   */
  sudokuSolver(): number[][] {
    for (let lineNumber = 0; lineNumber < this.sudoku.length; lineNumber++) {
      for (let col = 0; col < this.sudoku.length; col++) {
        if (this.sudoku[lineNumber][col] === 0) {
          const square = new Square(col, lineNumber);
          let trouve = false;
          let n = 1;
          this.sudoku[lineNumber][col] = 0;
          do {
            if (!this.inLine(n, lineNumber) && !this.inColumn(n, col) && !this.inSquare(n, square)) {
              this.sudoku[lineNumber][col] = n;
              trouve = true;
            }
            ++n;
          } while (!trouve && n <= 9);
        }
      }
    }
    return this.sudoku;
  }

  /*
    This function allows to solve a sudoku with the back tracking method. Its consist to solve recursevily using the position
   */
  sudokuSolverBacktracking(position: number): boolean {
    if (position === 81) { return  true; }

    const line = Math.trunc(position / 9);
    const col = position % 9;
    if (this.sudoku[line][col] !== 0) { return this.sudokuSolverBacktracking(position + 1); }

    for (let k = 1; k <= 9; k++) {
      const square = new Square(col, line);
      if (!this.inLine(k, line) && !this.inColumn(k, col) && !this.inSquare(k, square)) {
        this.sudoku[line][col] = k;

        if ( this.sudokuSolverBacktracking (position + 1) ) { return true; }
      }
    }
    this.sudoku[line][col] = 0;

    return false;
  }
}
