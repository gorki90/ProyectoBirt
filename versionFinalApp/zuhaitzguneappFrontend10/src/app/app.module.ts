
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { AccesoComponent } from './acceso/acceso.component';
import { ArbolesComponent } from './arboles/arboles.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import {  HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { MapGeoserverIdComponent } from './map-geoserver-id/map-geoserver-id.component';
import { TareasComponent } from './tareas/tareas.component';
import { PerfilComponent } from './perfil/perfil.component';

//FIREBASE
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule, Routes } from '@angular/router';

//ANGULAR MATERIAL

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';





@NgModule({
    declarations: [
        AppComponent,
        AccesoComponent,
        ArbolesComponent,
        AyudaComponent,
        InicioComponent,
        MapGeoserverIdComponent,
        PerfilComponent,
        TareasComponent,
        LogoutComponent,
        ErrorComponent
        
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
    ],
    providers: [
        appRoutingProviders, 
        provideHttpClient(withInterceptorsFromDi()), 
        MatPaginatorIntl,

//        AppRoutingModule

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
