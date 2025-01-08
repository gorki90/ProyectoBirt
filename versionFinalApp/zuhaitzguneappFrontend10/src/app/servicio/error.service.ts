import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessage: string = '';
  private errorMessages: string[] = [];
  private ruta = '/';

  constructor(private router: Router) { }
  setError(messages: string[], ruta: string = '/'): void {
    
    this.errorMessages = messages;
    this.ruta = ruta;
    this.router.navigate(['/error']); // Redirige al componente de error
  }

  getError(): string[] {
    return this.errorMessages;
  }

  clearError(): void {
    this.errorMessages = [];
    this.router.navigate([this.ruta]); // Limpia el mensaje de error al salir del componente
  }

}
