import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/services/http.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http:HttpService
  ) { }

  login(postDate:any):Observable<any>{
    return this.http.post('login',postDate)
  }

}
