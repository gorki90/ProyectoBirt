import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8000/api';  // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener la imagen en Base64 desde el backend
  // con encodeURIComponent() asegura de que los caracteres especiales en una cadena 
  //sean representados de manera segura dentro de una URL
  getImageAsBase64(imagePath: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/obtener-imagen?path=storage/fotos_arboles/${encodeURIComponent(imagePath)}`);
  }

  updateImage(imageFile: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-imagen`, imageFile);
  }
  deleteImage(nombre_imagen:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-imagen/${nombre_imagen}`);
  }

  getFoto(foto: string): Observable<Blob> {
    const url = `${this.apiUrl}/foto/${foto}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
