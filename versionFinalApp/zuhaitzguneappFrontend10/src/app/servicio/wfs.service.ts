import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Arbol } from '../modelo/arbol.model';
@Injectable({
  providedIn: 'root'
})
export class WfsService {

  //  private wfsUrl = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=zuhaitzguneapp:identificacion_localizacion&outputFormat=application/json';
  private wfsUrl = 'http://localhost:8080/geoserver/zuhaitzguneapp/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=zuhaitzguneapp:identificacion_localizacion&outputFormat=application/json';
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // MÃ©todo para obtener el JSON ARBOLES

  getArboles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arboles/all`);
  }
  ///////////////////////////////////////////////////////////////////
  // Método para obtener datos de GeoServer
  getFeatures(): Observable<any> {
    return this.http.get(this.wfsUrl);
  }
  // Método para crear un nuevo árbol
  createTree(treeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/arboles/create`, treeData);
  }
  // Método para buscar un arbol por id
  getFeaturesId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/arboles/${id}`);
  }
  // Método para actualizar un nuevo árbol
  updateTree(treeData: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/arboles/update/${id}`, treeData);
  }
  // Método para eliminar un árbol
  eliminarArbol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/arboles/delete/${id}`);
  }
  // Método para obtener los datos de un árbol 
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
  // Método para obtener los barrios
  getBarrios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/arboles/barrios`);
  }
  // // Método para determinar si la búsqueda es por barrio o calle
  // isBarrioSearch(barrioCalle: string): Observable<'barrio' | 'calle'> {
  //   return this.getBarrios().pipe(
  //     map(barrios => {
  //       if (barrios && barrios.includes(barrioCalle)) {
  //         return 'barrio'; // Si el valor está en la lista de barrios
  //       } else {
  //         return 'calle'; // Si no está en la lista de barrios
  //       }
  //     })
  //   );
  // }

  // Método para determinar si la búsqueda es por barrio o calle
  isBarrioSearch(barrioCalle: string): Observable<'barrio' | 'calle'> {
    return this.getBarrios().pipe(
      map(barrios => {
        // Verifica si barrioCalle es válido (no nulo ni vacío) y convierte a minúsculas
        const barrioCalleLower = barrioCalle?.toLowerCase() ?? '';

        if (barrios && barrios.some(barrio => barrio && barrio.toLowerCase() === barrioCalleLower)) {
          return 'barrio'; // Si el valor está en la lista de barrios (insensible a mayúsculas/minúsculas)
        } else {
          return 'calle'; // Si no está en la lista de barrios
        }
      })
    );
  }

  // Función para obtener los árboles filtrados por el nombre de la calle
  getFeaturesLocalizacion(filterType: 'barrio' | 'codigo' | 'calle', filterValue: string): Observable<any> {
    let cqlFilter = '';
    const lowerCaseValue = filterValue.toLowerCase();
    // Construir el filtro dinámico según el tipo
    switch (filterType) {
      case 'barrio':
        cqlFilter = `strToLowerCase(barrio) LIKE '${lowerCaseValue}'`;
        break;
      case 'codigo':
        cqlFilter = `strToLowerCase(codigo) LIKE '${lowerCaseValue}'`; 
        break;
      case 'calle':
        cqlFilter = `strToLowerCase(calle) LIKE '${lowerCaseValue}'`; 
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
    console.log(params.toString());
    return this.http.get(url, { params });
  }
  // Método para obtener las tareas
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarea`);
  }
  // Método para actualizar una tarea
  updateTask(taskData: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/tarea/update/${id}`, taskData);
  }
  // Método para obtener una tarea por id
  getTaskId(id: number): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/tarea/${id}`);
  }
  // Método para obtener tareas filtradas por campo y valor
  getTaskFiltro(campo: string, valor: string, filtros?: { barrio?: string; calle?: string; codigo?: string }): Observable<Arbol[]> {
   
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
    return this.http.get<Arbol[]>(`${this.apiUrl}/tarea/filtrar/` + campo + '/' + valor, { params });
  }


  //Llamadas a la api para los usuarios


  getUser(id:number):Observable<any>{
  return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  login(username:string, password:string):Observable<any>{
  return this.http.post(`${this.apiUrl}/user/login`,{username,password});
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

  getUserId():string|null{
      return localStorage.getItem("id");
   }
   
   setUserId(id: number): void {
    localStorage.setItem('id', id.toString());
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
    return this.http.put(`${this.apiUrl}/user/updateUser/${id}`, userData);
  }



}
