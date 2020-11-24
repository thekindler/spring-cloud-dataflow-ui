import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../security/service/security.service';
import { async } from '@angular/core/testing';
import { data } from 'jquery';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loggedinUser$ = this.securityService.loggedinUser();
  shouldProtect = this.securityService.shouldProtect();
  securityEnabled = this.securityService.securityEnabled();
  roles$ = this.securityService.roles();

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
    let user:String;
    this.loggedinUser$.subscribe(data=>{user=data}) 
    console.log("logged user: "+user)

    console.log(this.isAdminOrConfiguator())
    console.log(this.isAdminOrDashboardMonitor())
    console.log(this.isAdmin())

  }

  isAdminOrConfiguator():Boolean{

    let user:String;
    this.loggedinUser$.subscribe(data=>{user=data}) 
    
    if(user==="admin" || user==="configurator")
      return  true
    else return false
      
  }

  isAdminOrDashboardMonitor():Boolean{
    
    let user:String;
    this.loggedinUser$.subscribe(data=>{user=data}) 
    
    if(user==="admin" || user==="dashboard_monitor")
      return  true
    else return false
  }

  isAdmin():Boolean{

    let user:String;
    this.loggedinUser$.subscribe(data=>{user=data}) 
  
    if (user==="admin")
      return true
    else return false
  }
}
