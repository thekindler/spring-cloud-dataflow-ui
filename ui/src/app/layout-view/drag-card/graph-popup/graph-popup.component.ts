import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-graph-popup',
  templateUrl: './graph-popup.component.html',
  styleUrls: ['./graph-popup.component.scss']
})
export class GraphPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GraphPopupComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
