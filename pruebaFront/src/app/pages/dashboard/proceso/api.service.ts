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

  todo(postDate:any):Observable<any>{
    return this.http.get('proceso/ver',postDate)
  }

  guardar(postDate:any):Observable<any>{
    return this.http.post('proceso/crear',postDate)
  }

  actualizar(postDate:any,postDate2:any):Observable<any>{
    return this.http.patch(`proceso/editar/${postDate}`,postDate2)
  }

  delete(postDate:any):Observable<any>{
    return this.http.delete(`proceso/eliminar/${postDate}`,[])
  }

}
