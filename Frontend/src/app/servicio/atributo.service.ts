import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Arbol } from '../modelo/arbol.model';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {
  public arbol:Arbol = new Arbol (0,0,0,"", null);
  private _listaElegida: BehaviorSubject<Arbol>;

  constructor() {
    this._listaElegida = new BehaviorSubject<Arbol>(this.arbol)
  }; 
  // Almacena los datos de atributos
  get atributos() {
    return this._listaElegida.asObservable();
  }
  

  // Método para actualizar los atributos
  updateAttributes(attributes: any) {
    this.arbol=attributes;
    this._listaElegida.next(this.arbol);
  }
}
