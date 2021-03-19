import {Component, OnInit} from '@angular/core';
import {Matrice} from './helper/matrice';
import {Subscription} from 'rxjs';
import {SudokuService} from './service/front/sudoku.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sudoku';
  grilleTrous: number[][];
  sudokuSubscription: Subscription;
  showSolution = false;
  tmp:any;
  constructor(private sudokuService: SudokuService) {
  }
  ngOnInit(): void {
    const solution = [];
    this.sudokuSubscription = this.sudokuService.sudokuSubject.subscribe( (exercice: number[][]) => {
      this.grilleTrous = exercice;
    });
    this.sudokuService.emitExercice();


  }

  getSolution() {
    this.grilleTrous = this.sudokuService.getExercice();
    if (!this.showSolution) {
      const matrice = new Matrice(this.grilleTrous);
      matrice.sudokuSolver();
      //matrice.sudokuSolverBacktracking(0);
    }
    this.showSolution = !this.showSolution;
  }

}
