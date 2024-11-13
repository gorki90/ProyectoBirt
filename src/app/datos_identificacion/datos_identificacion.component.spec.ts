import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos_identificacionComponent } from './datos_identificacion.component';

describe('Datos_identificacionComponent', () => {
  let component: Datos_identificacionComponent;
  let fixture: ComponentFixture<Datos_identificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos_identificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datos_identificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
