import { Component, OnChanges, OnInit } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements  OnInit,OnChanges {

  name:string='';
  username:string='';
  foto:string='';

  constructor(private _http:WfsService, private router:Router, private fb:FormBuilder){
    
  }

  ngOnInit(): void {
    
  }

  ngOnChanges():void{

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.foto = file;  // Asigna el archivo a la propiedad foto
    }
  }

dataUpdates():void{

  console.log('Datos del formulario antes de enviar:', {
    name: this.name,
    username: this.username,
  });
const data:any= [];
data.push({ name: this.name });
data.push({ username: this.username });
data.push({ foto: this.foto });
console.log('Datos enviados:', data);

const id = parseInt(localStorage.getItem("id")!, 10);
this._http.updateUser(id, data).subscribe({
next:(response)=>{
  console.log("Usuario actualizado:", response);
  console.log(response.user.name);
  console.log('Datos enviados:', data);
},
error: (err)=>{
  console.error("Error al actualizar el usuario:", err);
}
})
}

}
