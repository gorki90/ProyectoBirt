import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arboles_detalleComponent } from './arboles_detalle.component';

describe('Arboles_detalleComponent', () => {
  let component: Arboles_detalleComponent;
  let fixture: ComponentFixture<Arboles_detalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Arboles_detalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Arboles_detalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
