import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Matrice } from '../../helper/matrice';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit, OnChanges {

  @Input() grille: number[][];
  modification: CellValidation [][] = [];
  message: string;
  constructor(private cdRef: ChangeDetectorRef, public errorsDialog: MatDialog) {}

  ngOnInit(): void {
    this.initSudoku();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  setValue(n: any, line: number, col: number) {
    if (n !== '' && n !== undefined && this.modification[line][col].updatable) {
      this.modification[line][col].updated = true;
      n = parseInt(String(n), 10);
      if (n < 0 || n > 9) {
        this.message = 'Conditions : 1<= chiffre <= 9';
        this.modification[line][col].valid = false;
      } else if (isNaN(n)) {
        this.message = 'vous devez rentrer un nombre';
        this.modification[line][col].valid = false;
      } else {
        const solution = new Matrice(this.grille);
        this.message = solution.testValue(n, line, col);
        if ((this.message.length > 0)) {
          this.modification[line][col].valid = false;
        } else {
          this.modification[line][col].valid = true;
        }
      }
      this.openErrorsDialog();
    }
  }

  initSudoku() {
    const size = 9;
    for (let i = 0 ; i < size; i++) {
      const tmp = [];
      for (let j = 0; j < size ; j++) {
        if (this.grille[i][j] === 0) {
          tmp.push({valid: true, updatable: true, updated: false});
        } else {
          tmp.push({valid: true, updatable: false, updated: false});
        }
      }
      this.modification.push(tmp);
    }
  }

  openErrorsDialog(): void {
    const dialogRef = this.errorsDialog.open(PopupComponent, {
      width: '250vw',
      data: {message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
export interface CellValidation {
  valid: boolean;
  updatable: boolean;
  updated: boolean;
}


