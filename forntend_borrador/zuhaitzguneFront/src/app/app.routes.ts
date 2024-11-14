import { Routes } from '@angular/router';
import { MostrarAtributosComponent } from './mostrar-atributos/mostrar-atributos.component';
import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
import { FormularioPrincipalComponent } from './formularioNew/formulario-principal/formulario-principal.component';

export const routes: Routes = [
    { path: "lista", component:MostrarAtributosComponent },
    { path: "mapaid", component:MapGeoserverIdComponent },
    { path: "formulario-definitivo", component:FormularioPrincipalComponent},

];
