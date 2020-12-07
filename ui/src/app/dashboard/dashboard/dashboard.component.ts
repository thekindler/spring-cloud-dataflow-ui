import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
India=["Delhi","Karnataka"];
Delhi=["d1","d2","d3","d4"];
Kerala=["k1","k2","k3","k4"];
Karnataka=["Bangalore"]

Australia=["Queensland", "Victoria"];
Queensland=["n1","n2","n3","n4"];
Victoria=["q1","q2","q3","q4"];

Iceland=["Reykjavik","Westfjords"];
Reykjavik=["r1","r2","r3","r4"];
Westfjords=["w1","w2","w3","w4"];

states:Array<string>=null; 
cities:Array<string>=null;
country:string;
state:string;
selectedcity:string;
//obj={"India":{"Delhi":["d1","d1","d1","d1"],"Kerala":["k1","k1","k1","k1"]},"Australia":{"New South Wales":["n1","n1","n1","n1"],"Queensland":["q1","q1","q1","q1"]}} 
constructor(private router: Router ) { }

  ngOnInit(): void {
  
  }
  getstates(e){
    console.log(e.target.value);
    this.country=e.target.value;
    this.cities=null;
    switch(e.target.value){
      case "India":{
        this.states=this.India;break;
      }
      case "Australia":{
        this.states=this.Australia;break;
      }
      case "Iceland":{
        this.states=this.Iceland;break;
      }
    }
    console.log(this.states);
    
  }
  getcities(ev){
    console.log(ev.target.value);
    
    if(this.country=="India"){
      switch(ev.target.value){
        case "Delhi":{
          this.cities=this.Delhi;break;
        }
        case "Karnataka":{
          this.cities=this.Karnataka;break;
        }
      }
    }

    if(this.country=="Australia"){
      switch(ev.target.value){
        case "Queensland":{
          this.cities=this.Queensland;break;
        }
        case "Victoria":{
          this.cities=this.Victoria;break;
        }
      }
    }

    if(this.country=="Iceland"){
      switch(ev.target.value){
        case "Reykjavik":{
          this.cities=this.Reykjavik;break;
        }
        case "Westfjords":{
          this.cities=this.Westfjords;break;
        }
      }
    }
    console.log(this.cities);
    
  }
  setcity(e){
    this.selectedcity=e.target.value;
    // this.dataserv.getdata().subscribe(
    //   suc=>{console.log(suc);},
    //   err=>{console.log(err);} 
    // )
  }
goto(){
  console.log("inside submit");
  this.router.navigate(['/register'])
}
}

 