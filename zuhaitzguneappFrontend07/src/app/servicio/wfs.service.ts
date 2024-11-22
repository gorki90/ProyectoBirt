import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  loadFeatures(extent: any): Observable<any> {
    const params = new HttpParams()
      .set('service', 'WFS')
      .set('version', '1.0.0')
      .set('request', 'GetFeature')
      .set('typename', 'zuhaitzguneapp:identificacion_localizacion') // Sustituye 'workspace:layer' por tu espacio de trabajo y capa
      .set('srsname', 'EPSG:3857') // Proyección del mapa
      .set('bbox', extent.join(',')) // Pasamos la extensión como BBOX
      .set('outputFormat', 'application/json'); 
    // URL del servicio WFS en tu servidor GeoServer
    const url = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs';

    return this.http.get(url, { params });
  }
  // Función para obtener los árboles filtrados por el nombre de la calle
  getFeaturesBarrio(streetName: string): Observable<any> {
    const params = new HttpParams()
      .set('service', 'WFS')
      .set('version', '1.1.0')
      .set('request', 'GetFeature')
      .set('typeName', 'zuhaitzguneapp:identificacion_localizacion')  // El nombre de la capa en GeoServer
      .set('outputFormat', 'application/json')
      .set('CQL_FILTER', `barrio LIKE '${streetName}%'`); // Filtrar por el nombre de la calle
    const url = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs';
    return this.http.get(url, { params });
  }
  getTasks() : Observable<any> {
    const url = 'http://localhost:8000/api/tarea';
    return this.http.get(url);
  }
  updateTask(taskData: any, id:number): Observable<any> {
    return this.http.put('http://localhost:8000/api/tarea/update/'+id, taskData);
  }
  getTaskId(id:number) : Observable<any> {
    const url = 'http://localhost:8000/api/tarea';
    return this.http.get(url+id);
  }
  getTaskFiltro(campo:string, valor:string, filtros?: { barrio?: string; calle?: string; codigo?: string }) {
    const url = 'http://localhost:8000/api/tarea/filtrar/';
      // Crear los parámetros de consulta
  let params = new HttpParams();
  if (filtros?.barrio) {
    params = params.set('barrio', filtros.barrio);
  }
  if (filtros?.calle) {
    params = params.set('calle', filtros.calle);
  }
  if (filtros?.codigo) {
    params = params.set('codigo', filtros.codigo);
  }
    return this.http.get(url+campo+'/'+valor, { params });
  }

}
