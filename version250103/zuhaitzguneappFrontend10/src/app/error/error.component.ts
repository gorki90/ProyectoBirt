import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from '../servicio/error.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy  {
  errorMessages: string[] = [];

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorMessages = this.errorService.getError();
    
  }

  goBack(): void {
    this.errorService.clearError();
    
  }

  ngOnDestroy(): void {
    this.errorService.clearError(); // Limpia el mensaje de error al destruir el componente
  }
}
