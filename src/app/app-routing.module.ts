import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SudokuSolverComponent} from './module/sudoku-solver/sudoku-solver.component';

const routes: Routes = [
  {path: 'sudoku', component: SudokuSolverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
