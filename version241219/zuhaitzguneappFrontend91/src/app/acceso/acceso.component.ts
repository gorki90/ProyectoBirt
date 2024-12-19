import { Component } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {

  loginForm:FormGroup;
  loginMessage: string = '';

constructor(private _http:WfsService, private router:Router, private fb:FormBuilder){
  this.loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
})
}

login(){
  if(this.loginForm.valid){
    const{username,password}=this.loginForm.value;

this._http.login(username,password).subscribe({
  next: (response:any)=>{
    console.log("Login exitoso ",response);
    this._http.setToken(response.token);
    this._http.setTUsername(response.username);
    this._http.setUserId(response.id);
    this.loginMessage = 'Login correcto';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  },
  error: (err) => {
    console.error('Error en el login:', err);
    this.loginMessage = 'Login incorrecto';

    setTimeout(() => {
      this.loginMessage = ''; // Limpiar el mensaje después de 3 segundos
    }, 3000);
  },
})

  }
}

 get passwordControl(): AbstractControl | null{
  return this.loginForm.get("password")
}

}
