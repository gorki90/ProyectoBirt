import { Component, OnInit } from '@angular/core';
//import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
//import { FormularioPrincipalComponent } from './formularioNew/formulario-principal/formulario-principal.component';
//import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
//import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
//  standalone: true,
//  imports: [RouterOutlet, MostrarAtributosComponent, FormularioPrincipalComponent, RouterLink, MapGeoserverIdComponent],
//  imports: [MostrarAtributosComponent, FormularioPrincipalComponent, RouterLink, MapGeoserverIdComponent],
//  imports: [RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
/*
export class AppComponent {
  title = 'zuhaitzguneappFrontend02';
}
*/
export class AppComponent implements OnInit{
  title = 'zuhaitzguneappFrontend02';
nombre: any|string;


  constructor(){
    console.log("Componente principal generado!!!")
  }
  ngOnInit(): void {
    
  }
}