import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  tareas!: FormArray<FormGroup>
  constructor(private fb: FormBuilder) {  
  }

  ngOnInit(): void {
    if (this.formGroup) {
      // Verificar si 'tasks' existe en el FormGroup
      if (!this.formGroup.get('tasks')) {
        // Si no existe, inicializar el FormArray
        this.formGroup.addControl('tasks', this.fb.array([]));
      }
  
      // Asignar el FormArray a la propiedad 'tareas'
      this.tareas = this.formGroup.get('tasks') as FormArray;
    } else {
      console.error('formGroup no está definido. Asegúrate de pasar un FormGroup al componente.');
    }
  }

  createTaskGroup(): FormGroup {
    return this.fb.group({
      tipo_accion: [''],
      descripcion_accion: [''],
      prioridad: [''],
      estado_accion: [''],
      fecha_comienzo: [''],
      fecha_limite: ['']
    });
  }

  addTask(event:Event) {

    this.tareas.push(this.createTaskGroup());
  }

  removeTask(index: number) {
    this.tareas.removeAt(index);
  }

  // Método auxiliar para obtener cada control como FormGroup
  getTaskFormGroup(index: number): FormGroup {
    return this.tareas.at(index) as FormGroup;
  }
}

