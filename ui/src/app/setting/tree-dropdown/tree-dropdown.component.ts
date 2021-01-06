import { Component, OnInit } from '@angular/core';


interface Country {
  countryName: string;
  state: string[];
  
 
}
interface State{
stateName:string;
  city:string[];
}

interface City{
  cityName:string;
  camera:string[];
}



@Component({
  selector: 'app-tree-dropdown',
  templateUrl: './tree-dropdown.component.html',
  styleUrls: ['./tree-dropdown.component.scss']
})
export class TreeDropdownComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
  }
  selectedCountry:any;
  cam1:any;
  states1:any;
  city1:any;
  val:number=0;
bool:boolean=false;
name:string;
countryBool:boolean=false;
stateBool:boolean=false;
cityBool:boolean=false;
   selected = 'option2';
   countries: Country[] = [
     {countryName: 'India', state: ['Kerala','Karnataka']},
     {countryName: 'Australia', state: ['Bourke St','Queensland']},
   ];
   states:State[]=[
     {stateName:'Kerala',city:['Trivandrum']},
     {stateName:'Karnataka',city:['Banglore','Mysore']},
     {stateName:'Bourke St',city:['Dockland']},
     {stateName:'Queensland',city:['Brisbane']}
 
   ]
   cities:City[]=[
     {cityName:'Trivandrum',camera:['c1','c2','c3']},
     {cityName:'Banglore',camera:['c1','c2','c3']},
     {cityName:'Mysore',camera:['c1','c2','c3']},
     {cityName:'Dockland',camera:['c1','c2','c3']},
     {cityName:'Brisbane',camera:['c1','c2','c3']},
 
   ]
 
   onCountryChange(event:any){
 this.countryBool=true;
 this.stateBool=false;
 this.cityBool=false;
 this.selectedCountry=event.value;
 for(let i=0;i<this.countries.length;i++){
   if(this.selectedCountry==this.countries[i].countryName)
     this.states1=this.countries[i].state;
   
 }
 
   }
   onStateChange(event:any){
    this.countryBool=true;
     this.stateBool=true;
     this.cityBool=false;
     for(let i=0;i<this.states.length;i++){
       if(event.value==this.states[i].stateName)
         this.city1=this.states[i].city;
       
     }
   }
 
   onCityChange(event:any){
     this.cityBool=true;
     this.countryBool=true;
     this.stateBool=true;
     for(let i=0;i<this.cities.length;i++){
       if(event.value==this.cities[i].cityName)
         this.cam1=this.cities[i].camera;
       
     }
   }
   preventDefault(event:any){
     event.preventDefault();
   }
 
}
