import { ArbolesService } from './../services/arboles.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Arbol } from './../models/arbol';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { MatTableModule } from '@angular/material/table'; // If you're also using MatTable


@Component({
  selector: 'app-arboles_tarjetas',
  templateUrl: './arboles_tarjetas.component.html',
  styleUrl: './arboles_tarjetas.component.css'
})

export class Arboles_tarjetasComponent implements AfterViewInit{

  arboles: Arbol[] = [];
//  dataSource: MatTableDataSource=null;
  dataSource: any;
  nombreColumnas=['nombre','abierto','horario','precio'];
  dato: string='';
    
@ViewChild(MatSort)
sort: MatSort | undefined;

@ViewChild(MatPaginator)
paginator: MatPaginator | undefined;

  constructor(private arbolesService: ArbolesService){
    this.arboles = this.arbolesService.getAll();
    this.dataSource=new MatTableDataSource(this.arboles);
  }

  filtrar(){
    this.dataSource.filter=this.dato;
  }
  ngAfterViewInit():void{
    //Inicializar el sort
    if (this.sort != undefined){
      this.dataSource.sort=this.sort;
    }

        //Inicializar el paginator
        if (this.paginator != undefined){
          this.dataSource.paginator=this.paginator;
        }
    
  }
}
