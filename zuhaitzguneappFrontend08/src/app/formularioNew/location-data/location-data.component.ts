import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Datos_menuComponent } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';
@Component({
  selector: 'app-location-data',
  standalone: true,
  imports: [ReactiveFormsModule,Datos_menuComponent,Datos_menufooterComponent],
//  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './location-data.component.html',
  styleUrl: './location-data.component.css'
})
export class LocationDataComponent implements OnChanges  {
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
