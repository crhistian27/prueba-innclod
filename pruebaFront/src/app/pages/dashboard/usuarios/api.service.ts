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
    return this.http.get('usuarios/ver',postDate)
  }

  guardar(postDate:any):Observable<any>{
    return this.http.post('usuarios/crear',postDate)
  }

  actualizar(postDate:any,postDate2:any):Observable<any>{
    return this.http.patch(`usuarios/editar/${postDate}`,postDate2)
  }

  delete(postDate:any):Observable<any>{
    return this.http.delete(`usuarios/eliminar/${postDate}`,[])
  }

  password(postDate:any,postDate2:any):Observable<any>{
    return this.http.patch(`usuarios/password/${postDate}`,postDate2)
  }

}
