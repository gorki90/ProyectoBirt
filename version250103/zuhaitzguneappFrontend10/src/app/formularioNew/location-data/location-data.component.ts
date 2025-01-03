import { Component, Input, OnChanges, SimpleChanges,  EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Datos_menuComponent } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-location-data',
  standalone: true,
  imports: [ReactiveFormsModule,Datos_menuComponent,CommonModule,Datos_menufooterComponent],
//  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './location-data.component.html',
  styleUrl: './location-data.component.css'
})
export class LocationDataComponent implements OnChanges  {
  @Input() formGroup!: FormGroup;  // Recibimos el FormGroup desde el componente padre
  selectedFile: File | null = null;
  // Declarar un Output para emitir el archivo
  @Output() fileSelected = new EventEmitter<File | null>();
  nombre_archivo!: any;
  photoPreview!:string;

  showPreview: boolean = false; 
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      if (this.formGroup) {
        // Aquí actualizamos nombre_archivo con el valor del campo foto en el formGroup
        const fotoValue = this.formGroup.get('foto')?.value;
        this.nombre_archivo = fotoValue || '';  // Asignamos el valor de la foto si existe, o cadena vacía
      } else {
        console.error('El formGroup es null o indefinido');
      }
    }
  }
  // evento para agregar foto
  onPhotoSelected(event: Event) {
    
    // Convierte el evento en un elemento de entrada HTML (<input>), 
    // para poder acceder a los archivos seleccionados (input.files).
    const input = event.target as HTMLInputElement;
    // input.files: Lista de archivos seleccionados por el usuario en el campo de entrada
    if (input.files && input.files[0]) {
      // asigno el primer archivo a la variable file(la imagen)
      const file = input.files[0];
      // Crea un objeto FileReader, que se usará para leer el contenido del archivo.
      const reader = new FileReader();
      //función que se ejecutará cuando FileReader termine de cargar el archivo.
      reader.onload = (e) => {
        // Se crea un objeto de tipo Image para cargar y manipular la imagen seleccionada.
        const img = new Image();
        // función que se ejecuta cuando la imagen ha terminado de cargarse. 
        // Esto asegura que tenemos acceso a las dimensiones originales de la imagen.
        img.onload = () => {
          // Se crea un elemento canvas de HTML dinámicamente, que se usará para redimensionar la imagen.
          const canvas = document.createElement('canvas');
          // Se obtiene el contexto de dibujo del canvas, 
          // necesario para trabajar con gráficos bidimensionales (dibujar la imagen en el canvas).
          const ctx = canvas.getContext('2d');
  
        // Se Especifica las dimensiones máximas que quiero permitir para la imagen.
        const maxWidth = 200; // Máximo ancho permitido
        const maxHeight = 400; // Máximo alto permitido

        // Dimensiones originales de la imagen
        const originalWidth = img.width;
        const originalHeight = img.height;

        // Se inicializa las nuevas dimensiones con las originales. 
        // Estas se modificarán si la imagen excede las dimensiones máximas.
        let newWidth = originalWidth;
        let newHeight = originalHeight;

        if (originalWidth > maxWidth || originalHeight > maxHeight) {
          // Se calcula cuánto debe reducirse la imagen para ajustarse al ancho o alto máximo.
          const widthRatio = maxWidth / originalWidth;
          const heightRatio = maxHeight / originalHeight;
          // Se selecciona el factor más pequeño para mantener la proporción.
          const scaleFactor = Math.min(widthRatio, heightRatio);
          // Se Multiplica las dimensiones originales por el scaleFactor calculado.
          newWidth = originalWidth * scaleFactor;
          newHeight = originalHeight * scaleFactor;
        }
        // Se Ajusta el tamaño del canvas al de las nuevas dimensiones calculadas.
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        // Redimensionar la imagen
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
  
        // Convertir el canvas a un archivo Blob

        canvas.toBlob((blob) => {
          console.log(blob);
          if (blob) {
              
            // Crear un archivo desde el Blob con las dimensiones deseadas
            const resizedFile = new File([blob], file.name, { type: file.type });
  
            // asignamos el archivo redimensionado
            this.selectedFile = resizedFile;
              
  
            // Emitir el archivo redimensionado al componente padre
            this.fileSelected.emit(this.selectedFile);
            // Generar una vista previa
            const previewReader = new FileReader();
            previewReader.onload = () => {
              this.photoPreview = previewReader.result as string;
              // forzar que detecte los cambios
              this.cdr.detectChanges();
            };
            previewReader.readAsDataURL(this.selectedFile);
          }
        }, file.type);
      };
  
      img.src = e.target?.result as string; // Cargar la imagen seleccionada
    };
      // El evento onload está esperando a que el archivo se lea completamente 
      // en segundo plano, sin bloquear la ejecución del resto del código, pero necesita estar 
      // definido antes de que el archivo se comience a leer.
      reader.readAsDataURL(file); // Leer el archivo como DataURL
    }
  }
    // Método para alternar la visibilidad de la vista previa
  togglePreview(archivo:any) {
      this.showPreview = !this.showPreview;
      const previewReader = new FileReader();
              previewReader.onload = () => {
                this.photoPreview = previewReader.result as string;
                // detecto los cambios en los eventos
                this.cdr.detectChanges();
              };
              previewReader.readAsDataURL(archivo);
  }
  // Método para ocultar la vista previa cuando se hace clic en cualquier punto
  hidePreview() {
    this.showPreview = false;
    this.cdr.detectChanges();
  }
  }
