import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos_actuacionesComponent } from './datos_actuaciones.component';

describe('Datos_actuacionesComponent', () => {
  let component: Datos_actuacionesComponent;
  let fixture: ComponentFixture<Datos_actuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos_actuacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datos_actuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
