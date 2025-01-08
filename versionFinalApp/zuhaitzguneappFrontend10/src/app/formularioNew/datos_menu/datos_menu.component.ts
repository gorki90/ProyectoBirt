import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa esto
import { WfsService } from '../../servicio/wfs.service';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-datos_menu',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterModule],
  providers: [WfsService],
  templateUrl: './datos_menu.component.html',
  styleUrl: './datos_menu.component.css'
})

export class Datos_menuComponent implements OnInit {
  currentSection!: string;
  @Output() formSelected = new EventEmitter<string>();

  emitirSection(section: string) {
    console.log("section en datos_menu: ", section);
    this.formSelected.emit(section);
  }
  ngOnInit(): void {
    this.emitirSection('locationData');
  }
}
