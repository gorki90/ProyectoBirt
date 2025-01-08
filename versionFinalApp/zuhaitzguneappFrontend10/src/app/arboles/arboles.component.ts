import { Component, OnInit } from '@angular/core';
//import { ArbolService } from '../servicio/arbol.service';
import { WfsService } from '../servicio/wfs.service';
import { Router } from '@angular/router';
import { AtributoService } from '../servicio/atributo.service';
import { ImageService } from '../servicio/image.service';
import { Arbol } from '../modelo/arbol.model';

@Component({
  selector: 'app-arboles',
  templateUrl: './arboles.component.html',
  styleUrls: ['./arboles.component.css']
})
export class ArbolesComponent implements OnInit {
  arboles!: Arbol [];
  private attributes!: any;
 
  constructor(
//    private arbolService: ArbolService,
    private _wfsService:WfsService,
    private atributteService:AtributoService,
    private _router: Router,
    private _imageservice:ImageService  
  ) { }

  ngOnInit(): void {
    this.loadArboles();
  
  }
  loadArboles (){
    // Llamar a la API y obtener los datos
//    this.arbolService.getArboles().subscribe({
      this._wfsService.getArboles().subscribe({
        next: (data) => {
          this.arboles = data.map((arbol: Arbol) => {
            const fotoNombre = arbol.foto ? arbol.foto.split('/').pop() : ''; // Extraer el nombre de la foto
            if (fotoNombre) {
              this._imageservice.getFoto(fotoNombre).subscribe({
                next: (blob) => {
                  const objectURL = URL.createObjectURL(blob);
                  arbol.imageUrl = objectURL; // Asigna la URL de la imagen real
                },
                error: (err) => {
                  console.error(`Error al cargar la imagen ${fotoNombre}:`, err);
                  arbol.imageUrl = 'assets/img/Zuhaitzguneapp.png'; // Asigna la imagen predeterminada si falla
                },
              });
            } else {
              arbol.imageUrl = 'assets/img/Zuhaitzguneapp.png'; // Imagen predeterminada si no hay foto
            }
            return arbol;
          });
          console.log('Árboles procesados:', this.arboles);
        },
        error: (error) => {
          console.error('Error al obtener datos de la API:', error);
        },
    });
  }

  enviarMostrar(arbol:any) {
    this.atributteService.updateAttributes(arbol);
    this._router.navigate(["/lista"]);
}
  // Método para cargar la imagen desde el servicio
  // Método para obtener la URL de la imagen
  getImageUrl(foto: string): string {
    let imageUrl = '';
    this._imageservice.getFoto(foto).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        imageUrl = objectURL; // Guardar la URL generada
      },
      error: (err) => console.error(`Error al cargar la imagen ${foto}:`, err),
    });
    return imageUrl;
  }
}
/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-arboles',
  templateUrl: './arboles.component.html',
  styleUrl: './arboles.component.css'
})
export class ArbolesComponent implements OnInit{
  [x: string]: any;
  id: any;
  altura: any;
  diametro: any;
  nombre: string| null=null;
  //constructor(private route: ActivatedRoute) {}

  private _route: ActivatedRoute;
  private _router: Router;

  constructor(_route: ActivatedRoute,_router: Router ){
    this._route=_route;
    this._router=_router;
  
  }
  

  ngOnInit() {
    // Obtener el parámetro 'nombre'
//    this.route.params.subscribe(params => {
      this._route.params.subscribe(params => {
      this.id = params['id'];
      this.altura = params['altura'];
      this.diametro = params['diametro'];
      this.nombre = params['nombre'];
      console.log(this['id']);
      console.log(this['altura']);
      console.log(this['diametro']);
      console.log(this['nombre']);
    });

    // Obtener los parámetros de consulta (query params)
//    this.route.queryParams.subscribe(queryParams => {

      this._route.queryParams.subscribe(queryParams => {
        console.log(queryParams);
    });
  }

  mapa(){
    this._router.navigate(['/mapa']); //también se le podrían pasar parámetros
  }
  
  mapaid(){
    this._router.navigate(['/mapaid']); //también se le podrían pasar parámetros
  }
}
*/