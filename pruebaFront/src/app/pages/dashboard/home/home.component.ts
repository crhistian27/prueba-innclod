import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/services/auth.service';
import { interDocumento } from 'src/app/interfaces/documento.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent {

  @ViewChild('dt') table2: any;

  public datos:any;
  public bloqueo:boolean = false;
  
  public visible:boolean = false;
  public modal: string = '';
  public tipo: any;
  public inp_tipo: any;
  public proceso: any;
  public inp_proceso: any;
  public documento: interDocumento = {
    DOC_ID : 0,
    DOC_NOMBRE:"",
    DOC_CODIGO:"",
    DOC_CONTENIDO:"",
    DOC_ID_TIPO:0,
    DOC_ID_PROCESO:0,
    TIPO: "",
    PROCESO:"",
    PREFIJO1:"",
    PREFIJO2: ""
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
        const {message,result,tipo,proceso} = res
        this.bloqueo = false;
        this.datos = result;

        /* SELECT TIPO */
        let arrTipo: any = [];

        tipo.forEach((ele: any) => {
          arrTipo.push({ name: `(${ele.TIP_PREFIJO}) ${ele.TIP_NOMBRE}`, code: ele.TIP_ID, pre: ele.TIP_PREFIJO });
        });

        this.tipo = arrTipo;

        /* SELECT PROCESO */
        let arrProceso: any = [];

        proceso.forEach((ele: any) => {
          arrProceso.push({ name: `(${ele.PRO_PREFIJO}) ${ele.PRO_NOMBRE}`, code: ele.PRO_ID, pre: ele.PRO_PREFIJO });
        });
 
        this.proceso = arrProceso;

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
    this.modal = 'Crear Documento';
    this.visible = true;
    this.documento = {
      DOC_ID : 0,
      DOC_NOMBRE:"",
      DOC_CODIGO:"",
      DOC_CONTENIDO:"",
      DOC_ID_TIPO:0,
      DOC_ID_PROCESO:0,
      TIPO:"",
      PROCESO:"",
      PREFIJO1:"",
      PREFIJO2: ""
    };
    this.inp_tipo = undefined;
    this.inp_proceso = undefined;
  }

  saveUser(event:any){
    
    if(this.documento.DOC_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }

    if(this.documento.DOC_CODIGO == null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el codigo' });
      return false
    }
    
    if( this.inp_tipo == undefined || this.inp_tipo == null ){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione el tipo' });
      return false
    }

    if( this.inp_proceso == undefined || this.inp_proceso == null ){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione el proceso' });
      return false
    }

    this.documento.DOC_ID_TIPO = this.inp_tipo.code;
    this.documento.DOC_ID_PROCESO = this.inp_proceso.code;

    this.documento.PREFIJO1 = this.inp_tipo.pre;
    this.documento.PREFIJO2 = this.inp_proceso.pre;

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas crear el documento ${this.documento.DOC_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.guardar(this.documento).subscribe( (res:any) => {
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

  editar(event:any,info:interDocumento){

    this.modal = 'Editar Documento';
    this.visible = true;
    this.documento = {
      DOC_ID : info.DOC_ID,
      DOC_NOMBRE:info.DOC_NOMBRE,
      DOC_CODIGO:info.DOC_CODIGO,
      DOC_CONTENIDO:info.DOC_CONTENIDO,
      DOC_ID_TIPO:info.DOC_ID_TIPO,
      DOC_ID_PROCESO:info.DOC_ID_PROCESO,
      TIPO:info.TIPO,
      PROCESO:info.PROCESO,
      PREFIJO1: info.PREFIJO1,
      PREFIJO2: info.PREFIJO2,
    };
    console.log(info.DOC_ID_TIPO)
    this.inp_tipo = { code: info.DOC_ID_TIPO, name: info.TIPO, pre: info.PREFIJO1 }
    this.inp_proceso = { code: info.DOC_ID_PROCESO, name: info.PROCESO, pre: info.PREFIJO2 } 
  }

  updateUser(event:any){

    if(this.documento.DOC_NOMBRE == ''){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el nombre' });
      return false
    }

    if(this.documento.DOC_CODIGO == null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Digite el codigo' });
      return false
    }

    if( this.inp_tipo == undefined || this.inp_tipo == null ){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione el tipo' });
      return false
    }

    if( this.inp_proceso == undefined || this.inp_proceso == null ){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione el proceso' });
      return false
    }

    this.documento.DOC_ID_TIPO = this.inp_tipo.code;
    this.documento.DOC_ID_PROCESO = this.inp_proceso.code;

    this.documento.PREFIJO1 = this.inp_tipo.pre;
    this.documento.PREFIJO2 = this.inp_proceso.pre;

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas editar el documento ${this.documento.DOC_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.bloqueo = false;

        this.http.actualizar(this.documento.DOC_ID,this.documento).subscribe( (res:any) => {
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

  delete(event:any,info:interDocumento){
    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas eliminar el documento ${info.DOC_NOMBRE}?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {
        this.bloqueo = true;
        this.http.delete(info.DOC_ID).subscribe( (res:any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Documento eliminado` });
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
