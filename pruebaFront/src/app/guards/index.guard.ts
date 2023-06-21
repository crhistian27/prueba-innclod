import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor( private storageService: StorageService, private router: Router){ }

  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{ 
      resolve(true);

      const res:any = this.storageService.get(AuthConstants.AUTH);
    
      if(res){ 
        this.router.navigate(['dashboard/home']);
        resolve(false);
      }else{ 
        resolve(true);
      }
      
    })
  }
}
