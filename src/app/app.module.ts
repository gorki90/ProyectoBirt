//import { NgModule } from '@angular/core';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccesoComponent } from './acceso/acceso.component';
import { ArbolesComponent } from './arboles/arboles.component';
import { Arboles_detalleComponent } from './arboles_detalle/arboles_detalle.component';
import { Arboles_tarjetasComponent } from './arboles_tarjetas/arboles_tarjetas.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { DatosComponent } from './datos/datos.component';
import { Datos_actuacionesComponent } from './datos_actuaciones/datos_actuaciones.component';
import { Datos_biometricosComponent } from './datos_biometricos/datos_biometricos.component';
import { Datos_identificacionComponent } from './datos_identificacion/datos_identificacion.component';
import { Datos_menuComponent } from './datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from './datos_menufooter/datos_menufooter.component';
import { Datos_sanitariosComponent } from './datos_sanitarios/datos_sanitarios.component';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { MapaComponent } from './mapa/mapa.component';
import { TareasComponent } from './tareas/tareas.component';
import { PerfilComponent } from './perfil/perfil.component';
//FIREBASE
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterModule, Routes } from '@angular/router';
//ANGULAR MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const misRutas: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'arboles', component: ArbolesComponent},
    {path: 'arboles_detalle/:codigo', component: Arboles_detalleComponent},
    {path: '', redirectTo: 'inicio', pathMatch: 'full'}, // la ruta ha de ser exactamente localhost:4200
//    {path: '**', component: ErrorComponent} 
  ];

@NgModule({
    declarations: [
        AppComponent,
        AccesoComponent,
        ArbolesComponent,
        Arboles_detalleComponent,
        Arboles_tarjetasComponent,
        AyudaComponent,
        DatosComponent,
        Datos_actuacionesComponent,
        Datos_biometricosComponent,
        Datos_identificacionComponent,
        Datos_menuComponent,
        Datos_menufooterComponent,
        Datos_sanitariosComponent,
        InicioComponent,
        MapaComponent,
        PerfilComponent,
        TareasComponent
    ],
    imports: [BrowserModule,    
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterModule,
        routing,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
//        TranslateModule.forRoot({
//          loader: {
//            provide: TranslateLoader,
//            useFactory: (http: HttpClient) => {
//              return new TranslateHttpLoader(http);
//            },
//            deps: [HttpClient]
//          }
//        })
//        RouterModule.forRoot(misRutas),
//        HttpClientModule,
    ],
    providers: [
        appRoutingProviders, 
        provideHttpClient(withInterceptorsFromDi()), 
        MatPaginatorIntl,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
