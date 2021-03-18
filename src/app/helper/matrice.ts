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
        console.log(cloneLine);
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
    if (inLine) { message += ` le chiffre ${n} est deja present sur la ligne \r\n`; }
    if (inColumn) { message += ` le chiffre ${n} est deja present sur la colonne \r\n`; }
    if (this.inSquare(n, square)) { message += ` le chiffre ${n} est déjà present dans le carre \r\n`; }
    return message;
  }
  sudokuSolver(): number[][] {
    const solution = this.sudoku;
    for (let lineNumber = 0; lineNumber < solution.length; lineNumber++) {
      for (let col = 0; col < solution.length; col++) {
        if (solution[lineNumber][col] === 0) {
          const square = new Square(col, lineNumber);
          let trouve = false;
          let n = 1;
          solution[lineNumber][col] = 0;
          do {
            if (!this.inLine(n, lineNumber) && !this.inColumn(n, col) && !this.inSquare(n, square)) {
              solution[lineNumber][col] = n;
              trouve = true;
            }
            ++n;
          } while (!trouve && n <= 9);
        }
      }
    }
    return solution;
  }

}
