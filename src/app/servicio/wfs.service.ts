import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

//  private wfsUrl = 'http://localhost:8080/geoserver/abolesejemplo/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=abolesejemplo:arbolesejemplo&outputFormat=application/json';
  private wfsUrl = 'http://localhost:8080/geoserver/larraskitu/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=larraskitu:larraskitu&outputFormat=application/json';

  constructor(private http: HttpClient) {}

  // Método para obtener datos de GeoServer
  getFeatures(): Observable<any> {
    return this.http.get(this.wfsUrl);
  }
}
