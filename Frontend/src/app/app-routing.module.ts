//import { NgModule } from '@angular/core';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolesComponent } from './arboles/arboles.component';

const routes: Routes = [
//  { path: 'arboles/:nombre', component: ArbolesComponent }
{path: '/arboles/:id/:altura/:diametro/:nombre', component: ArbolesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
