import { Component, OnInit, HostBinding, ElementRef, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss'],
  animations: [
    trigger('dragElement', [
      transition(
        '* => *',
        animate('{{duration}}ms ease', style({ left: '{{left}}', top: '{{top}}'})),
        {params: {left: 'auto', top: 'auto', duration: '500'}}
      )
    ]),
    trigger('rotation', [
      transition(
        '* => *',
        animate('200ms ease', style({transform: 'rotate({{rotate}}deg)', overflow: 'hidden'})),
        {params: {rotate: 0}}
      )
    ])
  ]
})
export class LayoutViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dropCard = null;
  isLoaded = false;

  numberOfColumns = 4;
  rowHeight = 200;
  baseColSize = 1;
  baseRowSize = 1;

  baseDropElement = 'MAT-GRID-TILE';

  tries = 20;

  rotateDeg = 4;
  rotateCounts = 5;
  rotateSlow = 0.5;
  dragDuration = 1000;
  //cards:any[];
  data = [];
  cards = [{
      title: 'Camera 1',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg',
      data: {text: 'Objects Detected: 4'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 2',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 3',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 4',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 5',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 6',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 7',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 8',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Camera 9',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      image:'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg',
      data: {text: 'Objects Detected: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }
  ];
  page = 0;
  size = 4;
  constructor(private _elementRef: ElementRef,private changeDetectorRefs: ChangeDetectorRef) {
    
    //this.datafetch.getData().subscribe((data)=>{this.cards=data})
   }

  ngOnInit() {
    
    setTimeout(() => {
      this.updateRowNumbers(this.cards);
      this.isLoaded = true;
    }, 300)
    this.getData({pageIndex: this.page, pageSize: this.size});
    
   
  }
  // ngDoCheck() {
  //   console.log("change detected");
  //   //this.paginator._changePageSize(this.paginator.pageSize);
  //   //this.getData({pageIndex: this.page, pageSize: this.size});
   
    
  // }
  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.cards.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    
    //this.changeDetectorRefs.detectChanges();
  }
  onTileDrop(card) {
    this.dropCard = card;
    
  }

  getMatGridTile(element) {
    let {tries} = this;
    while (element.tagName !== this.baseDropElement) {
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

  onMouseDownTile(card) {
    if (!card.isRotating) {
      card.isRotating = true;
      if (card.rotate === 0) {
        card.rotate = this.rotateDeg;
      }
      this.rotate({count: this.rotateCounts, rotateSlow: this.rotateSlow, card: card, duration: 200, rotate: this.rotate});
    }
  }

  rotate(data) {
    if (data.count <= 0) {
      data.card.rotate = 0;
      data.card.isRotating = false;
      return;
    }

    data.card.rotate = - (Math.sign(data.card.rotate) * (Math.abs(data.card.rotate) - data.rotateSlow));
    data.count--;
    setTimeout(data.rotate, data.duration, data);
  }

  /* MOVING TILES */
  setXPosition(card, value) { card.params.left = value + 'px'; }
  setYPosition(card, value) { card.params.top = value + 'px'; }

  setAutoPositions(card) {
    card.params.left = 'auto';
    card.params.top = 'auto';
  }

  exchangeXPosition(card1, card2) {
    this.setXPosition(card1, card2.params.x);
    this.setXPosition(card2, card1.params.x);
  }

  exchangeYPosition(card1, card2) {
    this.setYPosition(card1, card2.params.y);
    this.setYPosition(card2, card1.params.y);
  }

  moveTileAside(card, target) {
    if (target.params.x < card.params.x) {
      this.setXPosition(card, target.params.x);
    } else {
      if (card.params.width < target.params.width) {
        this.setXPosition(card, target.params.x + target.params.width - card.params.width);
      } else {
        this.setXPosition(card, target.params.x - (card.params.width - target.params.width));
      }
    }
  }

  moveAsideOneTile(cards, card1, cardIndex, card2, dropCardIndex) {
    let allColsInRow = 0;
    let tempCardColNum = 0;

    for (let i = 0; i < cards.length; i++) {
      const loopCard = cards[i];
      if (loopCard.rowNumber === card1.rowNumber) {
        if (i < cardIndex) { tempCardColNum += loopCard.cols; }
        allColsInRow += loopCard.cols;
      }
    }

    if (card2.cols > card1.cols) {
      const difference = card2.cols - card1.cols;
      if (allColsInRow + difference > this.numberOfColumns ) {
        card1.overflowShiftX = difference;
      }
    }
    if (tempCardColNum > this.numberOfColumns - card2.cols) {
      this.setXPosition(card1, card2.params.x + card2.params.width);
      this.setXPosition(card2, card2.params.x);
      card2.overflowX = true;
      return true;
    }
    return false;
  }

  moveAsideDifferentWidth(card, dropCard) {
    if (card.rowNumber !== dropCard.rowNumber) {
      const cardIndex = this.cards.indexOf(card);
      const dropCardIndex = this.cards.indexOf(dropCard);

      const isMoved = this.moveAsideOneTile(this.cards, card, cardIndex, dropCard, dropCardIndex);
      if (!isMoved) {
        const isMoved2 = this.moveAsideOneTile(this.cards, dropCard, dropCardIndex, card, cardIndex);
        if (!isMoved2) {
          this.exchangeXPosition(card, dropCard);
        }
      }
    } else {
      this.moveTileAside(dropCard, card);
      this.moveTileAside(card, dropCard);
    }
  }

  moveTilesAside(card, dropCard) {
    if (card.params.width !== dropCard.params.width) {
      this.moveAsideDifferentWidth(card, dropCard);
    } else {
      this.exchangeXPosition(card, dropCard);
    }
  }

  moveTileUpDown(card, target) {
    if (card.notMovingUpDown === true) {
      card.notMovingUpDown = false;
      return;
    }
    if (target.params.y < card.params.y) {
      this.setYPosition(card, target.params.y);
    } else {
      if (card.params.height < target.params.height) {
        this.setYPosition(card, target.params.y + target.params.height / 2);
      } else {
        this.setYPosition(card, target.params.y - card.params.height / 2);
      }
    }
  }

  moveTilesUpDown(card, dropCard) {
    if (card.params.height !== dropCard.params.height) {
      this.moveTileUpDown(card, dropCard);
      this.moveTileUpDown(dropCard, card);
    } else {
      if (card.overflowX) {
        this.setYPosition(dropCard, card.params.y);
        this.setYPosition(card, card.params.y);
      } else if (dropCard.overflowX) {
        this.setYPosition(card, dropCard.params.y);
        this.setYPosition(dropCard, dropCard.params.y);
      } else if (!card.overflowX && !dropCard.overflowX) {
        this.exchangeYPosition(card, dropCard);
      }
    }
  }

  setLeftMoveWithDifferentWidth(card, card1, card2) {
    this.setXPosition(card, card.params.x + card1.params.width - card2.params.width);
    this.setYPosition(card, card.params.y);
    card.isMoved = true;
  }

  moveOtherTilesInOneRow(card, dropCard, cards, cardIndex, dropCardIndex) {
    if (Math.abs(cardIndex - dropCardIndex) > 1) {
      if (card.params.width !== dropCard.params.width) {
        const min = Math.min(cardIndex, dropCardIndex);
        const max = Math.max(cardIndex, dropCardIndex);
        for (let i = min + 1; i < max; i++) {
          cards[i].state = !cards[i].state;
          if (cardIndex > dropCardIndex) {
            this.setLeftMoveWithDifferentWidth(cards[i], card, dropCard);
          } else {
            this.setLeftMoveWithDifferentWidth(cards[i], dropCard, card);
          }
        }
      }
    }
  }

  moveCardRow(movedCard, card, dropCard, cardNum, cardIndex, rowCols, shiftCols) {
    if (cardNum > cardIndex) {
      if (rowCols + shiftCols > this.numberOfColumns) {
        movedCard.state = !movedCard.state;
        this.setXPosition(movedCard, dropCard.params.x);
        this.setYPosition(movedCard, dropCard.params.y);
        movedCard.isMoved = true;
      } else {
        movedCard.state = !movedCard.state;
        this.setLeftMoveWithDifferentWidth(movedCard, dropCard, card);
      }
    }
  }

  moveOtherTilesRow(cards, card1, card2, card1Index, card2Index) {
    let tempRowCols = 0;

    for (let cardNum = 0; cardNum < cards.length; cardNum++) {
      const loopCard = cards[cardNum];
      if (loopCard.rowNumber === card1.rowNumber) {
        tempRowCols += loopCard.cols;
        if (!card1.overflowX) {
          this.moveCardRow(loopCard, card1, card2, cardNum, card1Index, tempRowCols, card1.overflowShiftX);
        } else {
          this.moveCardRow(loopCard, card2, card1, cardNum, card2Index, tempRowCols, card1.overflowShiftX);
        }
      }
    }
  }

  moveOtherTilesInDifferentRows(card, dropCard, cards, cardIndex, dropCardIndex) {
    if (card.params.width !== dropCard.params.width) {
      const min = Math.min(cardIndex, dropCardIndex);
      const max = Math.max(cardIndex, dropCardIndex);

      this.moveOtherTilesRow(cards, card, dropCard, cardIndex, dropCardIndex);
      this.moveOtherTilesRow(cards, dropCard, card, dropCardIndex, cardIndex);
    }
  }

  moveOtherTiles(card, dropCard, cards) {
    const cardIndex = cards.indexOf(card);
    const dropCardIndex = cards.indexOf(dropCard);

    if (card.rowNumber === dropCard.rowNumber) {
      this.moveOtherTilesInOneRow(card, dropCard, cards, cardIndex, dropCardIndex);
    } else {
      this.moveOtherTilesInDifferentRows(card, dropCard, cards, cardIndex, dropCardIndex);
    }
  }

  getRowFreeSpace(rowNumber) {
    let rowSize = 0;

    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].rowNumber === rowNumber) { rowSize += this.cards[i].cols; }
    }
    return rowSize;
  }

  movingTiles(card, dropCard, cards) {
    this.moveTilesAside(card, dropCard);
    this.moveOtherTiles(card, dropCard, cards);
    this.moveTilesUpDown(card, dropCard);

    card.overflowX = false;
    card.overflowShiftX = false;
    dropCard.overflowX = false;
    dropCard.overflowShiftX = false;
  }

  /* DRAG AND DROP STUFF */
  swapCardsPlaces(data) {
    const {cards, card, dropCard} = data;
    const hoverIndex = cards.indexOf(card);
    const dropIndex = cards.indexOf(dropCard);

    cards.splice(hoverIndex, 1, dropCard);
    cards.splice(dropIndex, 1, card);
    card.toggleDragged = !card.toggleDragged;
    dropCard.toggleDragged = !dropCard.toggleDragged;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].isMoved) {
        cards[i].toggleDragged = !cards[i].toggleDragged;
        cards[i].isMoved = false;
      }
    }
    data.updateRowNumbers(cards);
    setTimeout(() => {
      data.updateRowNumbers(cards);
    }, 200);
    
  }

  onMouseMoveGrid(card, event) {
    const gridTile = this.getMatGridTile(event.target);
    this.setCardPositionForAnimation(card, gridTile);

    if (!this.dropCard) { return; }

    if (card !== this.dropCard) {
      const {cards, dropCard} = this;

      card.state = !card.state;
      dropCard.state = !dropCard.state;

      this.movingTiles(card, dropCard, cards);

      setTimeout(
        this.swapCardsPlaces,
        this.dragDuration,
        {cards: cards, card: card, dropCard: dropCard, updateRowNumbers: this.updateRowNumbers.bind(this)}
      );
    }
    this.dropCard = null;
  }

  updateRowNumbers(cards) {
    if (!cards) { cards = this.cards; }
    const grid = this._elementRef.nativeElement.getElementsByTagName(this.baseDropElement);
    let tempRowNum = 1;
    let tempColNum = 0;
    let tempColNum2 = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      console.log("////"+card)
      tempColNum += card.cols;
      if (tempColNum > this.numberOfColumns) {
        tempRowNum++;
        tempColNum = card.cols;
        tempColNum2 = 0;
      }
      card.rowNumber = tempRowNum;
      // card.rows=card.rowNumber;
      
      const gridTile = grid[i];
      this.setCardPositionForAnimation(card, gridTile);

      card.colNumber = tempColNum2;
      // card.cols=card.colNumber;
      
      tempColNum2 += card.cols;
      
    }
    
    //this.datafetch.postData(this.cards).subscribe((data)=>{console.log(data)})
   
    //this.getData({pageIndex: this.page, pageSize: this.size});
    // this.paginator._changePageSize(this.paginator.pageSize); 
    // this.data=this.data
    //this.changeDetectorRefs.detectChanges();
  }
  

}
