import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent implements OnInit {


  constructor(){
  }

     //Metodo para copiar el email al portapapeles
    copyEmail() {
    
      const email ="info@zuhaitzguneapp.eus";
  
      navigator.clipboard.writeText(email).then(()=>{
        alert("Correo copiado al portapapeles "+ email)
      }).catch(er=>{
        console.error("Error al copiar email "+ er)
      })
    }
  

ngOnInit(): void {

}

}
