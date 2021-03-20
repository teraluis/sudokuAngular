import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SudokuService} from '../../service/front/sudoku.service';
import {Matrice} from '../../helper/matrice';

@Component({
  selector: 'app-sudoku-solver',
  templateUrl: './sudoku-solver.component.html',
  styleUrls: ['./sudoku-solver.component.scss']
})
export class SudokuSolverComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
    this.sudokuSubscription.unsubscribe();
  }

}
