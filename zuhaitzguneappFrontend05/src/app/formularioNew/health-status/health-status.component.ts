import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Datos_menuComponent } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';

@Component({
  selector: 'app-health-status',
  standalone: true,
  imports: [ReactiveFormsModule,Datos_menuComponent,Datos_menufooterComponent],
  templateUrl: './health-status.component.html',
  styleUrl: './health-status.component.css'
})
export class HealthStatusComponent implements OnChanges  {
  @Input() formGroup!: FormGroup;  // Recibimos el FormGroup desde el componente padre
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      if (this.formGroup) {
        console.log('FormGroup recibido en el hijo:', this.formGroup.value);
      } else {
        console.error('El formGroup es null o indefinido');
      }
    }
  }
  }
