import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor( public authService: AuthService,private storageService: StorageService, private router: Router){ }

  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{ 
      resolve(true);
      const res:any = this.storageService.get(AuthConstants.AUTH);
      
      if(res){ 
          resolve(true);
      }else{ 
        this.router.navigate(['login']);
        resolve(false);
      }

    })
  }

  
}
