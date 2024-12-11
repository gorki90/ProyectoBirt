import { Component, OnInit } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { Router } from '@angular/router';
import { AtributoService } from '../servicio/atributo.service';
import { ImageService } from '../servicio/image.service';
import { Arbol } from '../modelo/arbol.model';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements	OnInit {
  tareasArboles!:Arbol [];
  tareaArbol!: Arbol;
  filtroOculto:boolean= false;
  campoFiltro!:string;
  filtroValor: string=''; 
  mensajeListaVacia:string='';
  //filtros opcionales
  barrio: string = '';
  calle: string = '';
  codigo: string = '';
  
  filtroOpcionalActivo: string | null = null; // Rastrea el filtro opcional activo
  mensajeError: string ='';
  error:boolean=false;
  constructor(
    private _wfsService:WfsService,
    private atributteService:AtributoService,
    private router:Router,
    private _imageservice: ImageService,
    
  ){
    
  }
  ngOnInit(): void {

    this.loadTareas();
    
  };


  loadTareas (){
    this._wfsService.getTasks().subscribe({

      next: (data) => {
        this.tareasArboles = data.map((arbol: Arbol) => {
          const fotoNombre = arbol.foto ? arbol.foto.split('/').pop() : ''; // Extraer el nombre de la foto
          if (fotoNombre) {
            this._imageservice.getFoto(fotoNombre).subscribe({
              next: (blob) => {
                const objectURL = URL.createObjectURL(blob);
                arbol.imageUrl = objectURL; // Asigna la URL de la imagen real
              },
              error: (err) => {
                console.error(`Error al cargar la imagen ${arbol.foto}:`, err);
                arbol.imageUrl = 'assets/img/Zuhaitzguneapp.png'; // Asigna la imagen predeterminada si falla
              },
            });
          } else {
            arbol.imageUrl = 'assets/img/Zuhaitzguneapp.png'; // Imagen predeterminada si no hay foto
          }
          return arbol;
        });
        console.log('Árboles procesados:', this.tareasArboles);
      },
      error: (error) => {
        console.error('Error al obtener datos de la API:', error);
      },
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
        console.log ("este es el arbol",this.tareasArboles);
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
        console.log(`el campo ${this.campoFiltro} no tiene el formato adecuado`);
        this.mensajeError=`El campo ${this.campoFiltro} no tiene el formato adecuado`;
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
  enviarMostrar(arbol:any) {
      this.atributteService.updateAttributes(arbol);
      this.router.navigate(["/lista"]);
  }
  

  
}
