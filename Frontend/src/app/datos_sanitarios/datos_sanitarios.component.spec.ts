import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos_sanitariosComponent } from './datos_sanitarios.component';

describe('Datos_sanitariosComponent', () => {
  let component: Datos_sanitariosComponent;
  let fixture: ComponentFixture<Datos_sanitariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos_sanitariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datos_sanitariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
