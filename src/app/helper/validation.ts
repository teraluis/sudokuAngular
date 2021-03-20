import {Square} from './square';

export interface Validation {
  isValidLine(a: Array<number>): boolean;

  isValidSudoku(matrice: Array<Array<number>>): boolean;

  inLine(n: number, lineNumber: number): boolean;

  inColumn(n: number, colNumber: number): boolean;

  inSquare(n: number, square: Square): boolean;

  sudokuSolver(): number[][];
}
