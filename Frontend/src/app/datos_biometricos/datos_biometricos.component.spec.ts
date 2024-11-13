import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos_biometricosComponent } from './datos_biometricos.component';

describe('Datos_biometricosComponent', () => {
  let component: Datos_biometricosComponent;
  let fixture: ComponentFixture<Datos_biometricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos_biometricosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datos_biometricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
