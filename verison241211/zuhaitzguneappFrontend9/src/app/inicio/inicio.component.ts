import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WfsService } from '../servicio/wfs.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  private _route: ActivatedRoute;
  private _router: Router;
 username:string|null=null;
  constructor(_route: ActivatedRoute, _router: Router, private _http:WfsService) {
    this._route = _route;
    this._router = _router;

  }

  ngOnInit(): void {
    console.log();
    this.loadUserData();
  };

  loadUserData(): void {
    if (this._http.isAuthenticated()) {
      this.username = this._http.getUsername();  // Llamar al método del servicio
    }
  }

  isAuthenticated(): boolean {
    return this._http.isAuthenticated();
  }

  map() {
    this._router.navigate(['/map']); //también se le podrían pasar parámetros
  }
  mapa() {
    this._router.navigate(['/mapa']); //también se le podrían pasar parámetros
  }
  mapaid() {
    this._router.navigate(['/mapaid']); //también se le podrían pasar parámetros
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
