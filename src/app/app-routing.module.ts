import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SudokuSolverComponent} from './module/sudoku-solver/sudoku-solver.component';
import {InscriptionComponent} from './module/inscription/inscription.component';

const routes: Routes = [
  {path: 'sudoku', component: SudokuSolverComponent},
  {path: 'inscription', component: InscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
