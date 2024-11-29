import { Component, EventEmitter, Output, Input} from '@angular/core';
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
export class Datos_menufooterComponent   { 

  @Input() currentSection!: string; // Recibe la sección activa
  @Input() sections!: string[]; // Recibe todas las secciones
  @Output() sectionChanged = new EventEmitter<string>();

  // Métodos para navegar
  navigate(direction: 'prev' | 'next') {
    const currentIndex = this.sections.indexOf(this.currentSection);
    if (direction === 'prev' && currentIndex > 0) {
      this.sectionChanged.emit(this.sections[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < this.sections.length - 1) {
      this.sectionChanged.emit(this.sections[currentIndex + 1]);
    }
  }

  isFirstSection(): boolean {
    return this.sections.indexOf(this.currentSection) === 0;
  }

  isLastSection(): boolean {
    return this.sections.indexOf(this.currentSection) === this.sections.length - 1;
  }
}



