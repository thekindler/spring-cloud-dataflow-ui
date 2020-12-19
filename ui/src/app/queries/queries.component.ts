import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  title = 'dropdown';
  data:any;
 constructor(private dataService: DataService){

 }
 ngOnInit(){
   this.dataService.getData().subscribe((data)=>{this.data=data})
 }

}
