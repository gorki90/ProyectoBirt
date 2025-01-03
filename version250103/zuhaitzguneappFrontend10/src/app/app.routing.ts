import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router" ;
import { Route} from "@angular/router" ;

import { InicioComponent } from "./inicio/inicio.component";
//import { MapaComponent } from "./mapa/mapa.component";
import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
import { FormularioPrincipalComponent } from './formularioNew/formulario-principal/formulario-principal.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { TareasComponent } from "./tareas/tareas.component";
//import { Arboles_tarjetasComponent } from "./arboles_tarjetas/arboles_tarjetas.component";
//import { Arboles_detalleComponent } from "./arboles_detalle/arboles_detalle.component";
import { AyudaComponent } from "./ayuda/ayuda.component";
import { AccesoComponent } from "./acceso/acceso.component";
//import { DatosComponent } from "./datos/datos.component";
import { ArbolesComponent } from "./arboles/arboles.component";
import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
//import { MapGeoserverWFSComponent } from './map-geoserver-wfs/map-geoserver-wfs.component';
//import { MapGeoserverWMSComponent } from './map-geoserver-wms/map-geoserver-wms.component';
//import { MapComponent } from "./map/map.component";
//import { Datos_identificacionComponent } from "./datos_identificacion/datos_identificacion.component";
//import { Datos_biometricosComponent } from "./datos_biometricos/datos_biometricos.component";
//import { Datos_sanitariosComponent } from "./datos_sanitarios/datos_sanitarios.component";
//import { Datos_actuacionesComponent } from "./datos_actuaciones/datos_actuaciones.component";
import { DasometricDataComponent } from './formularioNew/dasometric-data/dasometric-data.component';
import { HealthStatusComponent } from './formularioNew/health-status/health-status.component';
import { LocationDataComponent } from './formularioNew/location-data/location-data.component';
import { TasksComponent } from './formularioNew/tasks/tasks.component';
import { LogoutComponent } from "./logout/logout.component";
import { ErrorComponent } from "./error/error.component";
//import { TasksNewComponent } from './tasksNew/tasksNew.component';
//rutas de la página web
const appRoutes: Routes = [
{path:'inicio',component: InicioComponent},                                     //ruta del navegador a acceder, componente a cargar
{path:'formulario-definitivo', component:FormularioPrincipalComponent},
//{path:'mapa',component: MapaComponent},                                         //ruta del navegador a acceder, componente a cargar
{path:'mapaid', component:MapGeoserverIdComponent },
//{path:'map',component: MapComponent},                                           //ruta del navegador a acceder, componente a cargar
//{path:'mapaWFS',component: MapGeoserverWFSComponent},
//{path:'mapaWMS',component: MapGeoserverWMSComponent},
{path:'tareas',component: TareasComponent},                                     //ruta del navegador a acceder, componente a cargar
//{path:'tareas',component: TasksNewComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'arboles/:id/:altura/:diametro/:nombre',component: ArbolesComponent},     //ruta del navegador a acceder, componente a cargar
{path:'lista', component:MostrarAtributosComponent },
//{path:'datos', component: DatosComponent},                                      //ruta del navegador a acceder, componente a cargar
//{path:'identificacion', component: Datos_identificacionComponent},              //ruta para llegar a datos_identificación
//{path:'biometria', component: Datos_biometricosComponent},                      //ruta para llegar a datos_biometricos
//{path:'salud', component: Datos_sanitariosComponent},                           //ruta para llegar a datos_sanitarios
//{path:'actuaciones', component: Datos_actuacionesComponent},                    //ruta para llegar a datos_actuaciones
{path:'ayuda', component: AyudaComponent},                                      //ruta del navegador a acceder, componente a cargar
{path:'perfil', component: PerfilComponent},                                    //ruta del navegador a acceder, componente a cargar
{path:'acceso', component: AccesoComponent},                                    //ruta del navegador a acceder, componente a cargar
//{path:'arboles_tarjetas',component: Arboles_tarjetasComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'locationData', component: LocationDataComponent},              //ruta para llegar a datos_identificación
{path:'dasometricData', component: DasometricDataComponent},                      //ruta para llegar a datos_biometricos
{path:'salir', component: LogoutComponent},
{path:'healthStatus', component: HealthStatusComponent},                           //ruta para llegar a datos_sanitarios
{path:'tasks', component: TasksComponent},  
{path:'error', component: ErrorComponent},              //ruta para errores
{path:'**',component: InicioComponent},                                         //si da un error, siempre nos dirige a la página principal
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(appRoutes);