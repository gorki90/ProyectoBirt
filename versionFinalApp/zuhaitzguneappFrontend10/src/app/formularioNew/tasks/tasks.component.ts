import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Datos_menuComponent } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Datos_menuComponent, Datos_menufooterComponent],
//  imports: [ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  tareas!: FormArray<FormGroup>
  constructor(private fb: FormBuilder) {  
  }

  ngOnInit(): void {
    console.log('esto me da',this.formGroup);
        // Verificar si 'tasks' está presente en el formGroup
        if (this.formGroup) {
          this.tareas = this.formGroup.get('tasks') as FormArray<FormGroup>;
          if (!this.tareas) {
            console.error('El FormArray tasks no está presente en el FormGroup');
          }
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
