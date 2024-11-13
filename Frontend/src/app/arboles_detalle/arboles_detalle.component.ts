import { ArbolesService } from './../services/arboles.service';
import { ActivatedRoute } from '@angular/router';
import { Arbol } from './../models/arbol';
import { Component } from '@angular/core';

@Component({
  selector: 'app-arboles_detalle',
  templateUrl: './arboles_detalle.component.html',
  styleUrl: './arboles_detalle.component.css'
})
export class Arboles_detalleComponent {

  id: number = 0;
  arbol?: Arbol;
  
  constructor(private ruta: ActivatedRoute, private arbolesService: ArbolesService){
    this.id = this.ruta.snapshot.params['codigo'];
    this.arbol = this.arbolesService.buscarArbol(this.id);
  }
}
