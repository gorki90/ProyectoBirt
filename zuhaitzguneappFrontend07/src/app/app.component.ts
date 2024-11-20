import { Component, OnInit } from '@angular/core';

//import { Datos_menuComponent, } from './formularioNew/datos_menu/datos_menu.component';
//import { Datos_menufooterComponent } from './formularioNew/datos_menufooter/datos_menufooter.component';
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
  title = 'zuhaitzguneappFrontend07';
}
*/
export class AppComponent implements OnInit{
  title = 'zuhaitzguneappFrontend07';
nombre: any|string;


  constructor(){
    console.log("Componente principal generado!!!")
  }
  ngOnInit(): void {
    
  }
}