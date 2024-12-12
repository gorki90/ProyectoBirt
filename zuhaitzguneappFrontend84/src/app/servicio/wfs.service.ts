import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WfsService {

  //  private wfsUrl = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=zuhaitzguneapp:identificacion_localizacion&outputFormat=application/json';
  private wfsUrl = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=zuhaitzguneapp:identificacion_localizacion&outputFormat=application/json';
  private apiUrl = 'http://localhost:8000/api/arboles/create';

  private apiUrlall = 'http://localhost:8000/api/arboles/all'; // URL de tu API ARBOLES

  private urlLogin="http://localhost:8000/api/user/login";

  private urlUsers="http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  // MÃ©todo para obtener el JSON ARBOLES

  getArboles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlall);
  }
  ///////////////////////////////////////////////////////////////////
  // Método para obtener datos de GeoServer
  getFeatures(): Observable<any> {
    return this.http.get(this.wfsUrl);
  }
  // Método para crear un nuevo árbol
  createTree(treeData: any): Observable<any> {
    return this.http.post(this.apiUrl, treeData);
  }
  getFeaturesId(id: number): Observable<any> {
    return this.http.get('http://localhost:8000/api/arboles/' + id);
  }
  updateTree(treeData: any, id: number): Observable<any> {
    return this.http.put('http://localhost:8000/api/arboles/update/' + id, treeData);
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
  getBarrios(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8000/api/arboles/barrios');
  }
  // Método para determinar si la búsqueda es por barrio o calle
  isBarrioSearch(barrioCalle: string): Observable<'barrio' | 'calle'> {
    return this.getBarrios().pipe(
      map(barrios => {
        if (barrios && barrios.includes(barrioCalle)) {
          return 'barrio'; // Si el valor está en la lista de barrios
        } else {
          return 'calle'; // Si no está en la lista de barrios
        }
      })
    );
  }
  // Función para obtener los árboles filtrados por el nombre de la calle
  getFeaturesLocalizacion(filterType: 'barrio' | 'codigo' | 'calle', filterValue: string): Observable<any> {
    let cqlFilter = '';

    // Construir el filtro dinámico según el tipo
    switch (filterType) {
      case 'barrio':
        cqlFilter = `barrio LIKE '${filterValue}%'`;
        break;
      case 'codigo':
        cqlFilter = `codigo LIKE '${filterValue}'`; // Ajusta 'codigo' al nombre del campo en GeoServer
        break;
      case 'calle':
        cqlFilter = `calle LIKE '${filterValue}%'`; // Ajusta 'calle' al nombre del campo en GeoServer
        break;
      default:
        throw new Error('Tipo de filtro no soportado');
    }

    // Construcción de los parámetros
    const params = new HttpParams()
      .set('service', 'WFS')
      .set('version', '1.1.0')
      .set('request', 'GetFeature')
      .set('typeName', 'zuhaitzguneapp:identificacion_localizacion') // Nombre de la capa en GeoServer
      .set('outputFormat', 'application/json')
      .set('CQL_FILTER', cqlFilter); // Usar el filtro dinámico

    const url = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs';
    return this.http.get(url, { params });
  }
  getTasks(): Observable<any> {
    const url = 'http://localhost:8000/api/tarea';
    return this.http.get(url);
  }
  updateTask(taskData: any, id: number): Observable<any> {
    return this.http.put('http://localhost:8000/api/tarea/update/' + id, taskData);
  }
  getTaskId(id: number): Observable<any> {
    const url = 'http://localhost:8000/api/tarea';
    return this.http.get(url + id);
  }
  getTaskFiltro(campo: string, valor: string, filtros?: { barrio?: string; calle?: string; codigo?: string }) {
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
    return this.http.get(url + campo + '/' + valor, { params });
  }


//Llamadas a la api para los usuarios

login(username:string, password:string):Observable<any>{
return this.http.post(this.urlLogin,{username,password});
}

setToken(token:string):void{
localStorage.setItem("token", token);
}

setTUsername(username:string):void{
  localStorage.setItem("username", username);
  }

getToken():string|null{
return localStorage.getItem("token");
}

getUsername():string|null{
  return localStorage.getItem("username");
  }

getUserId():number{
   const id = localStorage.getItem("id");
   return id ? parseInt(id,10) : 0;
}

setUserId(id:number):void{
localStorage.setItem("id",id.toString());
}

logout():void{
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

isAuthenticated():boolean{
  return !!this.getToken();
}

updateUser(id:number, userData:any):Observable<any>{
  return this.http.put(this.urlUsers + '/users/updateUser/' + id, userData);
}



}
