import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/services/auth.service';
import { interProceso } from 'src/app/interfaces/proceso.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProcesoComponent {

  @ViewChild('dt') table2: any;

  public datos:any;
  public bloqueo:boolean = false;
  
  public visible:boolean = false;
  public modal: string = '';
  public proceso: interProceso = {
    PRO_ID : 0,
    PRO_PREFIJO:"",
    PRO_NOMBRE:"",
  };

  constructor(
    private http: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService: AuthService,
  ){}

  ngOnInit() {
    this.buscar();
  }

  buscar(){
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
    this.modal = 'Crear Proceso';
    this.visible = true;
    this.proceso = {
      PRO_ID : 0,
      PRO_PREFIJO:"",
      PRO_NOMBRE:"",
    };
  }

  saveUser(event:any){
    
    if(this.proceso.PRO_PREFIJO == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el prefijo' });
      return false
    }

    if(this.proceso.PRO_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }


    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas crear el proceso ${this.proceso.PRO_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.guardar(this.proceso).subscribe( (res:any) => {
         this.buscar();
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

  editar(event:any,info:any){

    this.modal = 'Editar Proceso';
    this.visible = true;
    this.proceso = {
      PRO_ID : info.PRO_ID,
      PRO_PREFIJO:info.PRO_PREFIJO,
      PRO_NOMBRE:info.PRO_NOMBRE,
    };
      
  }

  updateUser(event:any){

    if(this.proceso.PRO_PREFIJO == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el prefijo' });
      return false
    }

    if(this.proceso.PRO_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas editar el proceso ${this.proceso.PRO_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.actualizar(this.proceso.PRO_ID,this.proceso).subscribe( (res:any) => {
         this.buscar();
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

  delete(event:any,info:interProceso){
    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas eliminar el proceso ${info.PRO_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {
        this.bloqueo = true;
        this.http.delete(info.PRO_ID).subscribe( (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Proceso eliminado` });
          this.bloqueo = false;
          this.buscar();
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
