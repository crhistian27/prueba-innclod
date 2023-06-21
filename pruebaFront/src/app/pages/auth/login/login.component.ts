import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

import { MessageService } from 'primeng/api';
import { estrucUser } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public usuario:estrucUser = {
    usuario: '',
    password: ''
  }
  public messages: any = [];

  constructor(
    public router: Router,
    private http: ApiService,
    public storageService: StorageService,
    private messageService: MessageService
  ){}

  ngOnInit() {
  }

  login():boolean{
    this.messages = [];

    if( this.usuario.password == '' || this.usuario.usuario == '' ){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite usuario/contraseña' });
        return false
    }

    this.http.login({user:this.usuario.usuario,pass:this.usuario.password}).subscribe( (res:any)=>{
      const {token} = res
      this.storageService.store(AuthConstants.AUTH,token);
      this.router.navigate(['dashboard/home']);
    },(err:any) => {
     
      const {message, error, statusCode} = err.error;
    
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    });
    

    /* this.router.navigate(['nav/home']); */
    return true
  }
}
