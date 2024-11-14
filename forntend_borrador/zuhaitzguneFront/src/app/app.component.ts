import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
import { FormularioPrincipalComponent } from './formularioNew/formulario-principal/formulario-principal.component';
import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MostrarAtributosComponent, FormularioPrincipalComponent, RouterLink, MapGeoserverIdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zuhaitzguneFront';
}
