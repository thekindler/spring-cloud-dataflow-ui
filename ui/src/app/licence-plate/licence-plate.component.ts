import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licence-plate',
  templateUrl: './licence-plate.component.html',
  styleUrls: ['./licence-plate.component.scss']
})
export class LicencePlateComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
goBack(){
  this.router.navigateByUrl("queries")
}

}
