import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  private _route: ActivatedRoute;
  private _router: Router;

  constructor(_route: ActivatedRoute, _router: Router) {
    this._route = _route;
    this._router = _router;

  }

  ngOnInit(): void {
    console.log();
  };

  map() {
    this._router.navigate(['/map']); //también se le podrían pasar parámetros
  }
  mapa() {
    this._router.navigate(['/mapa']); //también se le podrían pasar parámetros
  }
  mapaWFS() {
    this._router.navigate(['/mapaWFS']); //también se le podrían pasar parámetros
  }

  mapaWMS() {
    this._router.navigate(['/mapaWMS']); //también se le podrían pasar parámetros
  }
  acceso() {
    this._router.navigate(['/acceso']); //también se le podrían pasar parámetros
  }
}
