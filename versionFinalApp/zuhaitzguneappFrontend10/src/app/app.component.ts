import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { WfsService } from './servicio/wfs.service';
import { ThemeService } from './servicio/themeService';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

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
  forzarRecarga(ruta: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta]);
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