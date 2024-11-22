import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-location-data',
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
