import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router" ;
import { Route} from "@angular/router" ;

import { InicioComponent } from "./inicio/inicio.component";
import { MapaComponent } from "./mapa/mapa.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { TareasComponent } from "./tareas/tareas.component";
import { Arboles_tarjetasComponent } from "./arboles_tarjetas/arboles_tarjetas.component";
import { Arboles_detalleComponent } from "./arboles_detalle/arboles_detalle.component";
import { AyudaComponent } from "./ayuda/ayuda.component";
import { AccesoComponent } from "./acceso/acceso.component";
import { DatosComponent } from "./datos/datos.component";
import { ArbolesComponent } from "./arboles/arboles.component";
import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
import { MapGeoserverWFSComponent } from './map-geoserver-wfs/map-geoserver-wfs.component';
import { MapGeoserverWMSComponent } from './map-geoserver-wms/map-geoserver-wms.component';
import { MapComponent } from "./map/map.component";
//rutas de la página web
const appRoutes: Routes = [
{path:'inicio',component: InicioComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'mapa',component: MapaComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'map',component: MapComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'mapaWFS',component: MapGeoserverWFSComponent},
{path:'mapaWMS',component: MapGeoserverWMSComponent},
{path:'tareas',component: TareasComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'arboles/:id/:altura/:diametro/:nombre',component: ArbolesComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'lista', component: MostrarAtributosComponent },
{path:'datos',component: DatosComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'ayuda',component: AyudaComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'perfil',component: PerfilComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'acceso',component: AccesoComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'arboles_tarjetas',component: Arboles_tarjetasComponent},                 //ruta del navegador a acceder, componente a cargar
{path:'**',component: InicioComponent},               //si da un error, siempre nos dirige a la página principal

];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<Route>=RouterModule.forRoot(appRoutes);