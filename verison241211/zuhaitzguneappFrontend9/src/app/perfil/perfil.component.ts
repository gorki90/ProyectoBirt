import { Component, OnChanges, OnInit } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { NavigationStart, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from '../modelo/users.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements  OnInit,OnChanges {

  name:string='';
  username:string='';
  foto:string='';
  oldPass:string="";
  newPass:string="";
  newPass2:string="";

  user:Users=new Users();

  constructor(private _http:WfsService, private router:Router, private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.getDatosUser();
  }

  ngOnChanges():void{

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

dataUpdates():void{


this.user.name= this.name;
this.user.username= this.username;
this.user.foto= this.foto;

console.log('Datos enviados:', this.user);

const id = parseInt(localStorage.getItem("id")!, 10);
this._http.updateUser(id, this.user).subscribe({
next:(response)=>{
  console.log("Usuario actualizado:", response);
  console.log(response.user.name);
  console.log('Datos enviados:', this.user);
},
error: (err)=>{
  console.error("Error al actualizar el usuario:", err);
}
})
const loader=document.getElementById("popup-loader");
if( loader){
  loader.style.display="block";
}
setTimeout(()=>{
  
  if (loader) {
    loader.style.display = "none";
  }
},1000);

  
}

passwordUpdates():void{

  
  this.user.password=this.newPass;
  this.user.password_confirmation=this.newPass2;
  this.user.current_password=this.oldPass;
  
  console.log('Datos enviados:', this.user);
  
  const id = parseInt(localStorage.getItem("id")!, 10);
  this._http.updateUser(id, this.user).subscribe({
  next:(response)=>{
    console.log("Usuario actualizado:", response);
    console.log(response.user.name);
    console.log('Datos enviados:', this.user);
  },
  error: (err)=>{
    console.error("Error al actualizar el usuario:", err);
  }
  })
  const loader=document.getElementById("popup-loader");
if( loader){
  loader.style.display="block";
}
setTimeout(()=>{
  
  if (loader) {
    loader.style.display = "none";
  }
},1000);
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

}
