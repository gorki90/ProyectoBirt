import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Arbol } from '../modelo/arbol.model';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {
  private _listaElegida: BehaviorSubject<any>;
  private _newTreeCoordinates: BehaviorSubject<[number, number] | null>;
  private _isEditMode = new BehaviorSubject<boolean>(false);
  private _id: BehaviorSubject<number>;
  

  constructor() {
    this._listaElegida = new BehaviorSubject<any>(null),
    this._newTreeCoordinates = new BehaviorSubject<[number, number] | null>(null); 
    this._isEditMode = new BehaviorSubject<boolean>(false);
    this._id = new BehaviorSubject<number>(0);
  }; 
  // Almacena los datos de atributos
  get atributos() {
    return this._listaElegida.asObservable();
  }
  
  get newTreeCoordinates() {
    return this._newTreeCoordinates.asObservable();
  }
  get getEditMode() {
    return this._isEditMode.asObservable();
  }
  get getId() {
    return this._id.asObservable();
  }
  // Método para actualizar los atributos
  updateAttributes(attributes: any) {
    
    this._listaElegida.next(attributes);
  }
  // Método para almacenar las coordenadas del árbol
  setNewTreeCoordinates(coordinates: any | null) {
    this._newTreeCoordinates.next(coordinates);
  }
  setEditMode(mode: boolean) {
    this._isEditMode.next(mode);
}
  setId(id:number) {
    this._id.next(id);
  }
}

