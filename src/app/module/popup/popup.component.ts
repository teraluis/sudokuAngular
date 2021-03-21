import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorsModal
  ) {
    console.log(data)
  }

  ngOnInit(): void {
  }
  closeErrors() {
    this.dialogRef.close();
  }
}
export interface ErrorsModal {
  message: string[];
  errors: number;
}
