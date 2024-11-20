import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa esto
import { NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AtributoService } from '../../servicio/atributo.service';
import { Router } from '@angular/router';
import { WfsService } from '../../servicio/wfs.service';
import { Task } from '../../modelo/task.model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos_menufooter',
  standalone: true,
//  imports: [CommonModule]
  imports: [HttpClientModule,ReactiveFormsModule,RouterModule],
  providers: [WfsService],
  templateUrl: './datos_menufooter.component.html',
  styleUrl: './datos_menufooter.component.css'
})

//@NgModule({
//  exports: [RouterModule]
//})
export class Datos_menufooterComponent   { }


