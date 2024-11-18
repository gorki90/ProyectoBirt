import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Datos_menuComponent } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';
import { Subject, Subscription } from 'rxjs';
import { AtributoService } from '../../servicio/atributo.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DasometricDataComponent } from '../dasometric-data/dasometric-data.component';
import { HealthStatusComponent } from '../health-status/health-status.component';
import { TasksComponent } from '../tasks/tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WfsService } from '../../servicio/wfs.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../modelo/task.model';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-location-data',
  standalone: true,
  imports: [ReactiveFormsModule, Datos_menuComponent, Datos_menufooterComponent],
  templateUrl: './location-data.component.html',
  styleUrl: './location-data.component.css'
})
export class LocationDataComponent implements OnChanges {
  @Input() formGroup!: FormGroup;  // Recibimos el FormGroup desde el componente padre
  treeForm!: FormGroup;
  localizacion!: FormGroup;
  dasometria!: FormGroup;
  estadoSanitario!: FormGroup;
  tareas!: FormArray<FormGroup>;
  isEditMode: boolean = true;
  coordinates: [number, number] | null = null; // Para las coordenadas si estamos en modo de creación
  selectedAttributes: any; // Para almacenar los atributos seleccionados (si estamos editando)
  private coordinatesSubscription!: Subscription; // Añadir variable para la suscripción
  private unsubscribe$ = new Subject<void>();
  arbolidEdit!: number;
  currentSection!: string;

  constructor(
    private fb: FormBuilder,
    private atributoService: AtributoService,
    private wfsService: WfsService,
    private _editMode: AtributoService,
    private _id: AtributoService,
    private routes: Router

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      if (this.formGroup) {
        console.log('FormGroup recibido en el hijo:', this.formGroup.value);
      } else {
        console.error('El formGroup es null o indefinido');
      }
    }
  }

  ngOnInit(): void {
    // Formulario principal con secciones
    this.treeForm = this.fb.group({
      locationData: this.fb.group({
        //id: [this.selectedAttributes?.id || ''],
        codigo: [this.selectedAttributes?.codigo || ''],
        especie: [this.selectedAttributes?.especie || ''],
        nombre_comun: [this.selectedAttributes?.nombre_comun || ''],
        barrio: [this.selectedAttributes?.barrio || ''],
        calle: [this.selectedAttributes?.calle || ''],
        notas_ubicacion: [this.selectedAttributes?.notas_ubicacion || ''],
        coordenadaX: [this.coordinates?.[0] || ''],
        coordenadaY: [this.coordinates?.[1] || ''],
      }),

      dasometricData: this.fb.group({
        //id: [this.selectedAttributes?.id || ''],
        altura: [this.selectedAttributes?.altura || ''],
        diametro: [this.selectedAttributes?.diametro || ''],
        altura_primera_rama: [this.selectedAttributes?.altura_primera_rama || ''],
        morfologia: [this.selectedAttributes?.morfologia || ''],
        tipo_alcorque: [this.selectedAttributes?.tipo_alcorque || ''],
        disposicion: [this.selectedAttributes?.disposicion || ''],
      }),
      healthStatus: this.fb.group({
        enfermedades: [this.selectedAttributes?.enfermedades || ''],
        plagas: [this.selectedAttributes?.plagas || ''],
        riesgos: [this.selectedAttributes?.riesgos || ''],
        afecciones_abioticas: [this.selectedAttributes?.afecciones_abioticas || ''],
        notas: [this.selectedAttributes?.notas || ''],
        estado: [this.selectedAttributes?.estado || ''],
      }),
      // FormArray para las tareas
      tasks: this.fb.array([
        this.fb.group({
          tipo_accion: [this.selectedAttributes?.tipo_accion || ''],
          descripcion_accion: [this.selectedAttributes?.descripcion_accion || ''],
          prioridad: [this.selectedAttributes?.prioridad || ''],
          estado_accion: [this.selectedAttributes?.estado_accion || ''],
          fecha_comienzo: [this.selectedAttributes?.fecha_comienzo || ''],
          fecha_limite: [this.selectedAttributes?.fecha_limite || '']
        })
      ])
    });
    this.localizacion = this.treeForm.get('locationData') as FormGroup;
    this.dasometria = this.treeForm.get('dasometricData') as FormGroup;
    this.estadoSanitario = this.treeForm.get('healthStatus') as FormGroup;
    this.tareas = this.treeForm.get('tasks') as FormArray<FormGroup>;
    console.log('tareas', this.treeForm.get('locationData'));
    // me aseguro que isEditMode sea un valor booleano de forma que si no da dato, o es nulo, etc me inidque false
    this._editMode.getEditMode
      .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripción en OnDestroy
      .subscribe({
        next: data => {
          this.isEditMode = data;
          // Si estamos creando, obtener las coordenadas del árbol
          if (!this.isEditMode) {
            // Suscribirse al servicio de coordenadas, asegurándose de manejar la suscripción correctamente
            this.coordinatesSubscription = this.atributoService.newTreeCoordinates.subscribe(coordinates => {
              console.log("estas son las coordenadas", coordinates);
              if (coordinates && (this.coordinates === null || this.coordinates[0] !== coordinates[0] || this.coordinates[1] !== coordinates[1])) {
                this.coordinates = coordinates;
                // Actualizamos el formulario con las nuevas coordenadas
                this.treeForm.get('locationData')?.patchValue({
                  coordenadaX: coordinates[0],
                  coordenadaY: coordinates[1]
                });
              }
            });
          } else {
            // Modo de edición: cargar los atributos seleccionados en el formulario
            this.atributoService.atributos
              .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripción en OnDestroy
              .subscribe(attributes => {
                if (attributes) {
                  this.selectedAttributes = attributes;
                  this.arbolidEdit = attributes.id;
                  console.log("datos arbol0", attributes);
                  // se asigna valor a cada campo del formulario en cada seccion 
                  // por estar anidados
                  this.treeForm.get('locationData')?.patchValue({
                    codigo: attributes.codigo,
                    especie: attributes.especie,
                    nombre_comun: attributes.nombre_comun,
                    barrio: attributes.barrio,
                    calle: attributes.calle,
                    notas_ubicacion: attributes.notas_ubicacion,
                    coordenadaX: attributes.coordenadaX,
                    coordenadaY: attributes.coordenadaY,
                  }),
                    this.treeForm.get('dasometricData')?.patchValue({
                      altura: attributes.altura,
                      diametro: attributes.diametro,
                      altura_primera_rama: attributes.altura_primera_rama,
                      morfologia: attributes.morfologia,
                      tipo_alcorque: attributes.tipo_alcorque,
                      disposicion: attributes.disposicion,
                    }),
                    this.treeForm.get('healthStatus')?.patchValue({
                      enfermedades: attributes.enfermedades,
                      plagas: attributes.plagas,
                      riesgos: attributes.riesgos,
                      afecciones_abioticas: attributes.afecciones_abioticas,
                      estado: attributes.estado,
                      notas: attributes.notas,
                    });
                  const tasksFormArray = this.treeForm.get('tasks') as FormArray;
                  // se comprueba que es un array y que no está vacio
                  if (Array.isArray(attributes.tasks) && attributes.tasks.length > 0) {
                    // Limpiar el FormArray existente
                    tasksFormArray.clear();
                    // Crear un FormGroup para cada tarea y añadirlo al FormArray
                    attributes.tasks.forEach((task: Task) => {
                      tasksFormArray.push(this.fb.group({
                        descripcion_accion: [task.descripcion_accion || ''],
                        tipo_accion: [task.tipo_accion || ''],
                        prioridad: [task.prioridad || ''],
                        estado_accion: [task.estado_accion || ''],
                        fecha_comienzo: [task.fecha_comienzo || ''],
                        fecha_limite: [task.fecha_limite || '']
                      }));
                    });
                  } else {
                    // Si no hay tareas, asegúrate de que el FormArray esté vacío
                    console.log("No hay tareas, el FormArray se vacía");
                    tasksFormArray.clear();  // Vaciar el FormArray de tareas

                  }
                }
              });

          }
        }
      })
  }


  onSubmit() {
    console.log(this.treeForm.value);

    // Usamos los datos recogidos en el formulario para crear el arbol 
    if (!this.isEditMode) {
      const formData = this.treeForm.value;
      // envio datos formulario a la api para crear el arbol a traves del servicio wfsservice
      this.wfsService.createTree(formData)
        .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripción en OnDestroy
        .subscribe({
          next: response => {
            console.log('Árbol creado correctamente', response);
            // Redirijo después de la creación exitosa
            this.routes.navigate(['/mapaid']);
          },
          error: err => console.error("Error al crear el nuevo arbol", err)
        })
    } else {
      const formData = this.treeForm.value;
      // obtengo id del arbol mediante un servicio que permite obtrenerlo desde otro componente


      this._id.getId
        .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripción en OnDestroy
        .subscribe({
          next: data => {
            console.log('id', data, formData);

            // actualizo los datos en la bbdd atraves de la api con servicio wfsService
            this.wfsService.updateTree(formData, data)
              .pipe(takeUntil(this.unsubscribe$)) // Cancela la suscripción en OnDestroy
              .subscribe({
                next: response => {
                  console.log('Árbol actualizado correctamente', response);
                  // Redirigir o hacer algo después de la creación exitosa
                  this.routes.navigate(['/mapaid']);
                },
                error: err => console.error("Error al actualizar los atributos:", err)
              });
          },
          error: err => console.error("Error al actualizar los atributos:", err)
        });
    };
  }
  // metodo para marcar la seccion del formulario en la que se está
  setSection(section: string) {
    this.currentSection = section;
  }
  // metodo que cambia valor de variable unsubscribe$ u dessuscribe los obervables
  // al destrir el componente
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}