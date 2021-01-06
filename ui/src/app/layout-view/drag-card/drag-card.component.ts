import { Component, OnInit, ElementRef, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { GraphPopupComponent } from './graph-popup/graph-popup.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-drag-card',
  templateUrl: './drag-card.component.html',
  styleUrls: ['./drag-card.component.scss']
})
export class DragCardComponent implements OnInit, OnChanges {

  @Input() card;
  @Input() changed;
  @Output() drop = new EventEmitter();
  @Output() sizeChanged = new EventEmitter();

  tries = 20;
  animal: string;
  name: string;
  constructor(private _elementRef: ElementRef, public dialog: MatDialog) {}

  getMatGridTile(element) {
    let {tries} = this;
    while (element.tagName !== 'MAT-GRID-TILE') {
      element = element.parentElement;
      tries --;
      if (tries < 0) {
        break;
      }
    }
    return element;
  }

  setCardPositionForAnimation(card, gridTile) {
    card.params.x = gridTile.offsetLeft;
    card.params.y = gridTile.offsetTop;
    card.params.width = gridTile.offsetWidth;
    card.params.height = gridTile.offsetHeight;
  }

  updateRows() {
    this.card.cols=this.card.rows;
    this.sizeChanged.emit(this.card);
  }

  ngOnChanges() {
    const gridTile = this.getMatGridTile(this._elementRef.nativeElement);
    this.setCardPositionForAnimation(this.card, gridTile);
  }

  ngOnInit() {
    const el = this._elementRef.nativeElement;
    el.draggable = 'true';

    el.addEventListener('dragstart', (e) => {
      el.classList.add('drag-src');
      e.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      el.classList.remove('drag-src');
      this.drop.emit(this.card);
    });

    setTimeout(() => {
      this.ngOnChanges();
      console.log(this.card.params);
    }, 600);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(GraphPopupComponent, {
      width: '1000px',
      height:'500px',
      autoFocus: false,
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
