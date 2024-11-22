import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dasometric-data',
  templateUrl: './dasometric-data.component.html',
  styleUrl: './dasometric-data.component.css'
})
export class DasometricDataComponent implements OnChanges  {
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
