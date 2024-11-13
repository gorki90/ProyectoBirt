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
}
