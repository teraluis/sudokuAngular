import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  exercice = this.getExercice();

  sudokuSubject = new Subject<number[][]>();
  constructor() { }


  emitExercice() {
    return this.sudokuSubject.next(this.exercice);
  }

  getExercice(): number[][] {
    return this.sudokuA();
  }

  sudokuA(): number[][] {
    return  [
      [0, 0, 5, 0, 4, 8, 0, 3, 0],
      [4, 6, 0, 0, 7, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 9, 4, 5, 0],

      [0, 2, 0, 0, 0, 6, 0, 0, 0],
      [1, 0, 0, 0, 0, 2, 0, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0],

      [5, 0, 7, 0, 9, 0, 0, 0, 3],
      [0, 0, 0, 3, 2, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 7, 9, 0, 0],
    ];
  }

  sudokuB(): number[][] {
    return  [
      [2, 0, 0, 0, 0, 7, 8, 1, 3],
      [0, 1, 0, 0, 8, 5, 0, 0, 2],
      [0, 0, 8, 0, 2, 0, 0, 7, 5],

      [0, 9, 4, 1, 7, 2, 0, 8, 0],
      [8, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 7, 0, 0, 4, 9, 3, 0],

      [0, 7, 5, 0, 9, 0, 1, 0, 3],
      [0, 8, 2, 0, 5, 0, 3, 4, 0],
      [0, 0, 9, 0, 0, 0, 2, 5, 0],
    ];
  }
}
