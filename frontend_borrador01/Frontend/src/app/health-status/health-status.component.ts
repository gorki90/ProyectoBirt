import { Component, Input,  OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-health-status',
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
