import { Component, EventEmitter, Output, Input} from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { WfsService } from '../../servicio/wfs.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageService } from '../../servicio/image.service';
@Component({
  selector: 'app-datos_menufooter',
  standalone: true,
//  imports: [CommonModule]
  imports: [HttpClientModule,ReactiveFormsModule,RouterModule],
  providers: [WfsService, ImageService],
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
  @Input() arbolId!: number; // ID del árbol a eliminar

  constructor(
    private wfsService: WfsService, 
    private router: Router,
    private imgService: ImageService
  ) {}
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

  guardar(){
    const loader=document.getElementById("popup-loader");
    if( loader){
      loader.style.display="block";
    }
    setTimeout(()=>{
      
      if (loader) {
        loader.style.display = "none";
      }
    },1000);
  }
  // Método para eliminar un árbol y su imagen asociada
  eliminarArbol() {
    if (confirm('¿Estás seguro de que deseas eliminar este árbol?')) {
      // Obtener los datos del árbol antes de proceder
      this.wfsService.getFeaturesId(this.arbolId).subscribe({
        next: (arbol) => {
          const rutaImagen = arbol?.foto || null; // Manejo de caso donde `arbol` o `foto` sea null
          const nombreImagen = rutaImagen ? rutaImagen.split('/').pop() : null;
  
          // Primero, elimina el árbol
          this.wfsService.eliminarArbol(this.arbolId).subscribe({
            next: () => {
              if (nombreImagen) {
                // Si hay una imagen asociada, intenta eliminarla
                this.imgService.deleteImage(nombreImagen).subscribe({
                  next: () => {
                    alert('Árbol y su imagen eliminados con éxito');
                    this.router.navigate(['/mapaid']); // Redirigir al mapa
                  },
                  error: () => {
                    alert('Árbol eliminado, pero ocurrió un error al intentar eliminar la imagen asociada');
                    this.router.navigate(['/mapaid']); // Redirigir al mapa
                  }
                });
              } else {
                // Si no hay imagen asociada, solo elimina el árbol
                alert('Árbol eliminado con éxito, pero no se encontró imagen asociada');
                this.router.navigate(['/mapaid']); // Redirigir al mapa
              }
            },
            error: () => {
              alert('Ocurrió un error al intentar eliminar el árbol');
            }
          });
        },
        error: () => {
          alert('Ocurrió un error al intentar obtener los datos del árbol');
        }
      });
    }
  }
}





