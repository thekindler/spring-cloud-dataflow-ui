import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {
    
   }
   getData():Observable<any>{
    
    return this.http.get<any>("../assets/ai_services_list.json").pipe(tap(data=>console.log(data)))
   }
  
}
