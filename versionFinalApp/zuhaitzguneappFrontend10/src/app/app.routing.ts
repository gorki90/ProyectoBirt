import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router" ;
import { Route} from "@angular/router" ;
import { InicioComponent } from "./inicio/inicio.component";
import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
import { FormularioPrincipalComponent } from './formularioNew/formulario-principal/formulario-principal.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { TareasComponent } from "./tareas/tareas.component";
import { AyudaComponent } from "./ayuda/ayuda.component";
import { AccesoComponent } from "./acceso/acceso.component";
import { ArbolesComponent } from "./arboles/arboles.component";
import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
import { DasometricDataComponent } from './formularioNew/dasometric-data/dasometric-data.component';
import { HealthStatusComponent } from './formularioNew/health-status/health-status.component';
import { LocationDataComponent } from './formularioNew/location-data/location-data.component';
import { TasksComponent } from './formularioNew/tasks/tasks.component';
import { LogoutComponent } from "./logout/logout.component";
import { ErrorComponent } from "./error/error.component";

//rutas de la página web
const appRoutes: Routes = [
{path:'inicio',component: InicioComponent},                                     //ruta del navegador a acceder, componente a cargar
{path:'formulario-definitivo', component:FormularioPrincipalComponent},
{path:'mapaid', component:MapGeoserverIdComponent },
{path:'tareas',component: TareasComponent},                                     //ruta del navegador a acceder, componente a cargar
{path:'arboles/:id/:altura/:diametro/:nombre',component: ArbolesComponent},     //ruta del navegador a acceder, componente a cargar
{path:'lista', component:MostrarAtributosComponent },
{path:'ayuda', component: AyudaComponent},                                      //ruta del navegador a acceder, componente a cargar
{path:'perfil', component: PerfilComponent},                                    //ruta del navegador a acceder, componente a cargar
{path:'acceso', component: AccesoComponent},                                    //ruta del navegador a acceder, componente a cargar
{path:'locationData', component: LocationDataComponent},              //ruta para llegar a datos_identificación
{path:'dasometricData', component: DasometricDataComponent},                      //ruta para llegar a datos_biometricos
{path:'salir', component: LogoutComponent},                            //ruta para salir de la sesion    
{path:'healthStatus', component: HealthStatusComponent},                           //ruta para llegar a datos_sanitarios
{path:'tasks', component: TasksComponent},  
{path:'error', component: ErrorComponent},              //ruta para errores
{path:'**',component: InicioComponent},                                         //si da un error, siempre nos dirige a la página principal
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(appRoutes);