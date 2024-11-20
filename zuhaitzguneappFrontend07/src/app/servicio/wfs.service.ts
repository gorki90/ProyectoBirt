import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

//  private wfsUrl = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=zuhaitzguneapp:identificacion_localizacion&outputFormat=application/json';
  private wfsUrl = 'http://localhost:8080/geoserver/larraskitu/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=larraskitu:larraskitu&outputFormat=application/json';
  private apiUrl = 'http://localhost:8000/api/arboles/create';
  
  constructor(private http: HttpClient) {}

  // Método para obtener datos de GeoServer
  getFeatures(): Observable<any> {
    return this.http.get(this.wfsUrl);
  }
    // Método para crear un nuevo árbol
  createTree(treeData: any): Observable<any> {
      return this.http.post(this.apiUrl, treeData);
  }
  getFeaturesId(id: number): Observable<any> {
    return this.http.get('http://localhost:8000/api/arboles/'+id);
  }
  updateTree(treeData: any, id:number): Observable<any> {
    return this.http.put('http://localhost:8000/api/arboles/update/'+id, treeData);
}

}
