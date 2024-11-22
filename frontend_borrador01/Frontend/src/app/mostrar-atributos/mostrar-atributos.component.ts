// muestra los atributos de un arbol una vez se pincha en el componente map-geoserver-wfs
// en este caso los datos se comparten con el servicio atributo-service
// el servicio coge los datos en el componente map-geoserver-wfs al clikar sobre un arbol en el mapa
// se genra un observable en este componente al que se suscribe para obtener los valores
// finalmente se muestran en un html
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributoService } from '../servicio/atributo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-atributos',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './mostrar-atributos.component.html',
  styleUrl: './mostrar-atributos.component.css'
})
export class MostrarAtributosComponent implements OnInit {
  //  [x: string]: any;
  attributes: any = null;
  attributeKeys: string[] = [];

  private _route: ActivatedRoute;
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
    this._router.navigate(['/mapaWFS']); //también se le podrían pasar parámetros
  }
}

