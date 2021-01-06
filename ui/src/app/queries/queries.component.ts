import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  title = 'dropdown';
  data:any;
  selectedOption:any;
  bool:boolean=false;
 constructor(private dataService: DataService, private router:Router){

 }
 ngOnInit(){
   this.dataService.getData().subscribe((data)=>{this.data=data;console.log(data)})
 }
 onSelect(event){
   this.selectedOption=event.value;
   this.bool=true;
 }
 submit(){
   if(this.selectedOption==2)
    this.router.navigateByUrl("licence-plate");
 }

}
