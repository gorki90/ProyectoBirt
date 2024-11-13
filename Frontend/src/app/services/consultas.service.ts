import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConsultasService{

    public url: string;

    // _servicio : por estilo se indica que es un servicio con _
    constructor(public _http: HttpClient ){
        this.url="https://random-data-api.com/api/name/random_name";
    }


    Create(usuario: any): Observable<any>{
        return this._http.post<any>('https://reqres.in/api/users',usuario);
    }
    Read(): Observable<any>{
        return this._http.get("https://reqres.in/api/users?page=2");
        
    }
    Update(idUsuario: number, datos: any): Observable<any>{
        return this._http.put("https://reqres.in/api/users/"+idUsuario,datos);
        
    }
    Delete(idUsuario: number): Observable<any>{
        return this._http.delete("https://reqres.in/api/users/"+idUsuario);
        
    }

    getUser() : Observable<any>{
        return this._http.get(this.url);
    }

}