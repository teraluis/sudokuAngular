import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SudokuService} from '../../service/front/sudoku.service';
import {Matrice} from '../../helper/matrice';
import {GameRulers} from '../rules/rules.component';

@Component({
  selector: 'app-sudoku-solver',
  templateUrl: './sudoku-solver.component.html',
  styleUrls: ['./sudoku-solver.component.scss']
})
export class SudokuSolverComponent implements OnInit, AfterViewInit {

  grilleTrous: number[][];
  sudokuSubscription: Subscription;
  showSolution = false;
  sudokuRulers: GameRulers
  constructor(private sudokuService: SudokuService) {
  }
  ngOnInit(): void {
    this.sudokuSubscription = this.sudokuService.sudokuSubject.subscribe( (exercice: number[][]) => {
      this.grilleTrous = exercice;
    });
    this.sudokuService.emitExercice();
    this.sudokuRulers = {
      name: 'Sudoku',
      created: new Date('01-01-1979'),
      createdBy: 'Howard Gans',
      rulers: ['1 chiffre par colonne', '1 chiffre par ligne', '1 chiffre par petit carré']
    };
  }

  getSolution() {
    this.grilleTrous = this.sudokuService.getExercice();
    if (!this.showSolution) {
      const matrice = new Matrice(this.grilleTrous);
      matrice.sudokuSolverBacktracking(0);
    }
    this.showSolution = !this.showSolution;
  }

  ngAfterViewInit(): void {
    this.sudokuSubscription.unsubscribe();
  }

}
