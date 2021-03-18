import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SudokuComponent } from './module/sudoku/sudoku.component';
import {FormsModule} from '@angular/forms';
import { PopupComponent } from './module/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
