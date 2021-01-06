
import {AfterViewInit, OnInit,Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
export interface PeriodicElement {
  
  layoutname: string;
  camera:number;
  services:number;
  notifications: number;
  owner: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {layoutname: 'Entrance Layout',camera:5, services: 2, notifications: 4, owner: 'admin'},
  {layoutname: 'Floor 1 Layout',camera:3, services: 3, notifications: 5,owner: 'admin'},
  {layoutname: 'Entrance Layout',camera:5, services: 2, notifications: 4, owner: 'admin'},
  {layoutname: 'Floor 1 Layout',camera:3, services: 3, notifications: 5,owner: 'admin'},
  {layoutname: 'Entrance Layout',camera:5, services: 2, notifications: 4, owner: 'admin'},
  {layoutname: 'Floor 1 Layout',camera:3, services: 3, notifications: 5,owner: 'admin'},
  {layoutname: 'Entrance Layout',camera:5, services: 2, notifications: 4, owner: 'admin'},
  {layoutname: 'Floor 1 Layout',camera:3, services: 3, notifications: 5,owner: 'admin'},
  {layoutname: 'Entrance Layout',camera:5, services: 2, notifications: 4, owner: 'admin'},
  {layoutname: 'Floor 1 Layout',camera:3, services: 3, notifications: 5,owner: 'admin'},
  
];



@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements AfterViewInit {
  bool:Boolean;
  displayedColumns: string[] = ['icon','layoutname', 'camera', 'services', 'notifications','owner'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
 
  

}
