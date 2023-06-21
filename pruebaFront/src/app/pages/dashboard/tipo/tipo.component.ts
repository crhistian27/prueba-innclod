import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/services/auth.service';
import { interTipo } from 'src/app/interfaces/tipo.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TipoComponent {

  @ViewChild('dt') table2: any;

  public datos:any;
  public bloqueo:boolean = false;
  
  public visible:boolean = false;
  public modal: string = '';
  public tipo: interTipo = {
    TIP_ID : 0,
    TIP_NOMBRE:"",
    TIP_PREFIJO:"",
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
    this.modal = 'Crear Tipo';
    this.visible = true;
    this.tipo = {
      TIP_ID : 0,
      TIP_NOMBRE:"",
      TIP_PREFIJO:"",
    };
  }

  saveUser(event:any){
    
    if(this.tipo.TIP_PREFIJO == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el prefijo' });
      return false
    }

    if(this.tipo.TIP_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }
   
    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas crear el tipo ${this.tipo.TIP_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.guardar(this.tipo).subscribe( (res:any) => {
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

  editar(event:any,info:interTipo){

    this.modal = 'Editar Tipo';
    this.visible = true;
    this.tipo = {
      TIP_ID : info.TIP_ID,
      TIP_PREFIJO:info.TIP_PREFIJO,
      TIP_NOMBRE:info.TIP_NOMBRE,
    };
      
  }

  updateUser(event:any){

    if(this.tipo.TIP_PREFIJO == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el prefijo' });
      return false
    }

    if(this.tipo.TIP_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas editar el tipo ${this.tipo.TIP_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.actualizar(this.tipo.TIP_ID,this.tipo).subscribe( (res:any) => {
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

  delete(event:any,info:interTipo){
    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas eliminar el tipo ${info.TIP_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {
        this.bloqueo = true;
        this.http.delete(info.TIP_ID).subscribe( (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Tipo eliminado` });
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
