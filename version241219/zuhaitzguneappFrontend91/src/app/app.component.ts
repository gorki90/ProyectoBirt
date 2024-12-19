import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { WfsService } from './servicio/wfs.service';
import { ThemeService } from './servicio/themeService';
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
  title = 'zuhaitzguneappFrontend84';
}
*/
export class AppComponent implements OnInit{
  title = 'Zuhaitzguneapp';
  nombre: any|string;
  foto:string="";
  currentTheme: 'dark' | 'light';


  constructor(private router: Router,private _http:WfsService, private themeService: ThemeService){
    console.log("Componente principal generado!!!")
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getDatosUser();
      }
    });
    this.currentTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'light';
  }
  ngOnInit(): void {
    if (this.currentTheme === 'dark') {
      this.themeService.enableDarkTheme();
    } else {
      this.themeService.enableLightTheme();
    }
  }
  // metodo para destruir y volver a cargar el componente asociado
  forzarRecarga() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tareas']);
    });
  }
  isAuthenticated(): boolean {
    return this._http.isAuthenticated();
  }
  
  

  getDatosUser(){
   if(this.isAuthenticated()){
    const id = parseInt(localStorage.getItem("id")!, 10);
    this._http.getUser(id).subscribe({
      next:(response)=>{
        this.foto=`http://localhost:8000/storage/${response.foto}`;;
        console.log(this.foto);
      },
      error:(err)=>{
         console.log(err);
      }
    })
   }
  }

  toggleTheme(): void {
    
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
      this.themeService.enableDarkTheme();
    } else {
      this.currentTheme = 'light';
      this.themeService.enableLightTheme();
    }
    localStorage.setItem('theme', this.currentTheme);
  }

}