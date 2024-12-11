// muestra los atributos de un arbol una vez se pincha en el componente map-geoserver-wfs
// en este caso los datos se comparten con el servicio atributo-service
// el servicio coge los datos en el componente map-geoserver-wfs al clikar sobre un arbol en el mapa
// se genra un observable en este componente al que se suscribe para obtener los valores
// finalmente se muestran en un html
//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributoService } from '../servicio/atributo.service';
import { WfsService } from '../servicio/wfs.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../modelo/task.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { ActivatedRoute, Router } from '@angular/router';
import { Router } from '@angular/router';
import { ImageService } from '../servicio/image.service';

@Component({
  selector: 'app-mostrar-atributos',
  standalone: true,
  //  imports: [CommonModule],
  imports: [CommonModule, HttpClientModule],
  providers: [WfsService],
  templateUrl: './mostrar-atributos.component.html',
  styleUrl: './mostrar-atributos.component.css'
})
// export class MostrarAtributosComponent implements OnInit {
  export class MostrarAtributosComponent implements OnInit, OnDestroy {
    //  [x: string]: any;
  attributes: any = null;
  attributeKeys: string[] = [];
  isEditMode: boolean = false; // Variable para el modo de ediciÃ³n
  private _id!: number;
  private unsubscribe$ = new Subject<void>();
  imageUrl: string = ''; // Nueva propiedad para la URL de la imagen
  constructor(
    private attributeService: AtributoService,
    private datosArbol: AtributoService,
    private wfsService: WfsService,
    private router: Router,
    private editMode: AtributoService,
    private idArbol: AtributoService,
    private _imageservice:ImageService

  ) { }
  /*  private _route: ActivatedRoute;
    private _router: Router;
  
    //  constructor(private attributeService: AtributoService) {}
    constructor(
      _route: ActivatedRoute, _router: Router,
      private attributeService: AtributoService
    )
    //  {}
    {
      this._route = _route;
      this._router = _router;
    }
   
    ngOnInit(): void {
      //genero el observable y me suscribo
      this.attributeService.atributos.subscribe({
        next: data => {
          console.log("dato", data);
          this.attributes = data;
          this.attributeKeys = data ? Object.keys(data) : [];
        }
      });
    }
    mapaWFS() {
      this._router.navigate(['/mapaWFS']); //tambiÃ©n se le podrÃ­an pasar parÃ¡metros
    }
  }
     */
  ngOnInit(): void {
    //genero el observable y me suscribo para obtener el id 
    this.attributeService.atributos
      .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripciÃ³n en OnDestroy
      .subscribe({
       next: (data: { id: number; }) => {
          console.log("dato", data.id);
          this._id = data.id;
          //genero otro obervable para obtener los datos de la BBDD con el dato (id) obtenido de la otra subscripcion
          this.wfsService.getFeaturesId(this._id)
            .pipe(takeUntil(this.unsubscribe$)) // Cancela esta suscripciÃ³n tambiÃ©n en OnDestroy
            .subscribe({
              next: (response: {}) => {
                console.log('Ãrbol mostrado correctamente', response);
                this.attributes = response;
                // obtengo un array con las claves de los atributos
                this.attributeKeys = response ? Object.keys(response) : [];
                // Verifica si tasks es un array y extrae datos detallados si es necesario
                if (Array.isArray(this.attributes.tasks)) {
                  this.attributes.tasks = this.attributes.tasks.map((task: Task) => ({
                    ...task, // Muestra todos los campos del objeto `task`
                  }));
                };
                // Obtener URL de la imagen si existe la propiedad 'foto'
                if (this.attributes.foto) {
                  this.loadImage(this.attributes.foto);
                }
              },
              error: (err: any) => console.error("Error al obtener los atributos:", err)
            });
        },
        error: (err: any) => console.error("Error en el servicio de atributos:", err)
      });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.idArbol.setId(this._id);
      this.editMode.setEditMode(true);
      this.datosArbol.updateAttributes(this.attributes);
      console.log('datos formulario', this.attributes);
      this.router.navigate(['/formulario-definitivo']);
    }
  }
  mapaid() {
    this.router.navigate(['/mapaid']); //tambiÃ©n se le podrÃ­an pasar parÃ¡metros
  }
  // Método para cargar la imagen desde el servicio
  loadImage(foto: string): void {
    this._imageservice.getFoto(foto)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.imageUrl = objectURL; // Guardar la URL generada
        },
        error: (err) => console.error(`Error al cargar la imagen ${foto}:`, err),
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
}

