/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArbolService {
  private apiUrlall = 'http://localhost:8000/api/arboles/all'; // URL de tu API

  constructor(private http: HttpClient) {}

  // MÃ©todo para obtener el JSON
  getArboles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlall);
  }
}
*/