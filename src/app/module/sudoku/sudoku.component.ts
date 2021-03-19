import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Matrice } from '../../helper/matrice';
@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit, OnChanges {

  @Input() grille: number[][];
  modification: boolean [][] = [];
  message: string;
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initSudoku();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  setValue(n: any, line: number, col: number) {
    console.log('line : ' + line + " , " + col);
    if (n !== '' && n !== undefined) {
      n = parseInt(String(n), 10);
      if (n <= 0)   n = 1;
      if (n >= 9)  n = 9;
      if (isNaN(n)) n = 1;
      const solution = new Matrice(this.grille);
      this.message = solution.testValue(n, line, col);
      if ((this.message.length > 0)) {
        this.modification[line][col] = true;
      } else {
        this.modification[line][col] = false;
      }
    }
  }

  initSudoku() {
    const size = 9;
    for (let i = 0 ; i < size * size; i++) {
      const tmp = [];
      for (let j = 0; j < size; j++) {
        tmp.push(false);
      }
      this.modification.push(tmp);
    }
  }

}


