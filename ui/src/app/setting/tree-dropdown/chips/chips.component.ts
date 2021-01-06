
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild,OnInit,Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface City{
  cityName:string;
  camera:string[];
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent  {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  cameraCtrl = new FormControl();
  filteredCameras: Observable<string[]>;
  cameras: string[] = ['c1'];
  name:string;
  camArray:any[];
  cameraArray:any[];
  allCameras: string[] ;
  cities:City[]=[
    {cityName:'Trivandrum',camera:['c1','c2']},
    {cityName:'Banglore',camera:['c1']},
    {cityName:'Mysore',camera:['c1','c2','c3']},
    {cityName:'Dockland',camera:['c1','c2','c3']},
    {cityName:'Brisbane',camera:['c1','c2']},

  ]

  @ViewChild('cameraInput') cameraInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
@Input() set selectedCity(name: string){
  this.name=name;
  console.log(name);
  this.camArray=[];
  this.allCameras=[];
  for(var i=0;i<this.cities.length;i++){
    if(this.cities[i].cityName==name){
      this.camArray.push(this.cities[i].camera);
      
    }
    
  }
  console.log(this.camArray)
  this.allCameras=this.camArray[0]
  console.log(this.allCameras+"hiiiii")
}

  constructor() {
   
  }
  ngDoCheck(){
    console.log(this.allCameras+"hiiiiislice")
    this.filteredCameras = this.cameraCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCameras.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.cameras.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cameraCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.cameras.indexOf(fruit);

    if (index >= 0) {
      this.cameras.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cameras.push(event.option.viewValue);
    
    this.cameraInput.nativeElement.value = '';
    this.cameraCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCameras.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}
