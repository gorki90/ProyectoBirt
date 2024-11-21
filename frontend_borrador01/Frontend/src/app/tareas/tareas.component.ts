import { Component } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {
  tareasArboles!:any;
  filtroOculto:boolean= false;
  campoFiltro!:string;
  filtroValor: string=''; 
  mensajeListaVacia:string='';
  //filtros opcionales
  barrio: string = '';
  calle: string = '';
  codigo: string = '';
  
  filtroOpcionalActivo: string | null = null; // Rastrea el filtro opcional activo

  error:boolean=false;
  constructor(
    private _wfsService:WfsService,
    private router:Router
  ){
    
  }
  ngOnInit(): void {
    this.loadTareas();
  
  }
  loadTareas (){
    this._wfsService.getTasks().subscribe({
      next: data => {
        this.tareasArboles=data;
        console.log (this.tareasArboles);
      },
      error: err => {
        console.log(err)
      }
  
    })
  }
  aplicarFiltro(campoFiltro:string){
    this.filtroOculto = true;
    this.campoFiltro=campoFiltro;
    this.filtroValor='';
    this.mensajeListaVacia='';
  }
  activarFiltroOpcional(filtro: string) {
    this.filtroOpcionalActivo = filtro; // Activa el filtro opcional correspondiente
    
  }



  
  enviarFiltro(){
    const filtrosOpcionales = {
      barrio: this.barrio,
      calle: this.calle,
      codigo: this.codigo
    };

    this._wfsService.getTaskFiltro(this.campoFiltro, this.filtroValor, filtrosOpcionales).subscribe({
      next: data => {
        
        this.tareasArboles=data;
        if (this.tareasArboles.length !=0){
        console.log (this.tareasArboles);
        } else {
          this.mensajeListaVacia='No se encontraron árboles con tareas pendientes que coincidan con los criterios seleccionados.';
        }
        // reiniciar parametros y variables
        this.filtroOculto=false;
        this.filtroValor='';
        this.filtroOpcionalActivo = null; 
        this.barrio='';
        this.calle='';
        this.codigo='';
        this.error=false;
      },
      error: err => {
        this.error=true;
      }
    })
  }
  toggleTareaEstado(  tarea:any, tareaId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(isChecked);
    console.log('numero',tareaId);


    // Actualiza el estado de la tarea
    if (tarea) {
      tarea.estado_accion = isChecked ? 'finalizada' : 'en curso';
      this._wfsService.updateTask(tarea, tareaId).subscribe({
        next: data=> {
          console.log("registro actualizado", tarea);
        },
        error: err => {
          console.log(err);
        }
      })
    }

    console.log(`Estado de la tarea ${tareaId}: ${tarea?.estado_accion}`);
  }
}