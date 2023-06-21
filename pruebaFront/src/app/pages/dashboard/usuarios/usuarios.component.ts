import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/services/auth.service';
import { interUsuarios } from 'src/app/interfaces/usuarios.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit  {

  @ViewChild('dt') table2: any;

  public datos:any;
  public bloqueo:boolean = false;
  
  public visible:boolean = false;
  public modal: string = '';
  public usuarios: interUsuarios = {
    user_id :0,
    user_user:"",
    user_password:""
  };

  constructor(
    private http: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService: AuthService,
  ){}

  ngOnInit() {
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this.bloqueo = true;
    this.http.todo(0).subscribe( (res:any)=>{
      const {message,result} = res
      this.bloqueo = false;
      this.datos = result
    },(err:any) => {
      const {msg, status} = err.error;
      this.bloqueo = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
      if( status == 500 ){
        this.authService.close();
      }
    });
  }

  crear(){
    this.modal = 'Crear Usuario';
    this.visible = true;
    this.usuarios = {
      user_id :0,
      user_user:"",
      user_password:""
    };
  }

  saveUser(event:any){
    
    if(this.usuarios.user_user == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el usuario' });
      return false
    }

    if(this.usuarios.user_password == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite la contraseña' });
      return false
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas crear el usuario ${this.usuarios.user_user}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.guardar(this.usuarios).subscribe( (res:any) => {
         this.buscarUsuarios();
         this.bloqueo = true;
         this.visible = false;
        /*  element.hide(event); */
       },(err) =>{
         const {msg, status} = err.error;
         this.bloqueo = false;
         this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
         if( status == 500 ){
           this.authService.close();
         }
       });
       
      },
		  reject: () => {
			 
		  }
	  });

    return true;
  }

  editar(event:any,info:any){

    this.modal = 'Editar Usuario';
    this.visible = true;
    this.usuarios = {
      user_id :info.user_id,
      user_user:info.user_user,
      user_password : ""
    };
      
  }

  updateUser(event:any){


    if(this.usuarios.user_user == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el usuario' });
      return false
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas editar el usuario ${this.usuarios.user_user}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.actualizar(this.usuarios.user_id,this.usuarios).subscribe( (res:any) => {
         this.buscarUsuarios();
         this.bloqueo = true;
         this.visible = false;
       },(err) =>{
         const {msg, status} = err.error;
         this.bloqueo = false;
         this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
         if( status == 500 ){
           this.authService.close();
         }
       });
       
      },
		  reject: () => {
			 
		  }
	  });

    return true;
  }

  password(event:any,info:any){

    this.modal = 'Cambiar contraseña';
    this.visible = true;
    this.usuarios = {
      user_id :info.user_id,
      user_user:info.user_user,
      user_password : ""
    };

    return true;
  }

  btnPassword(event:any){

    if(this.usuarios.user_password == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite la contraseña' });
      return false
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas cambiar la contraseña del usuario ${this.usuarios.user_user}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.password(this.usuarios.user_id,this.usuarios).subscribe( (res:any) => {
         this.buscarUsuarios();
         this.bloqueo = true;
         this.visible = false;
       },(err) =>{
         const {msg, status} = err.error;
         this.bloqueo = false;
         this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
         if( status == 500 ){
           this.authService.close();
         }
       });
       
      },
		  reject: () => {
			 
		  }
	  });

    return true;
  }

  delete(event:any,info:any){
    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas eliminar el usuario ${info.user_user}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {
        this.bloqueo = true;
        this.http.delete(info.user_id ).subscribe( (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Usuario eliminado` });
          this.bloqueo = false;
          this.buscarUsuarios();
        },(err) =>{
          const {msg, status} = err.error;
          this.bloqueo = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          if( status == 500 ){
            this.authService.close();
          }
        });

		  },
		  reject: () => {
			 
		  }
	  	});
  }

  //tabla
  filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }

}
