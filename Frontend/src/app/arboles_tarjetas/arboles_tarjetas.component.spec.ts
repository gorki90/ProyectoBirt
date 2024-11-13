import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arboles_tarjetasComponent } from './arboles_tarjetas.component';

describe('Arboles_tarjetasComponent', () => {
  let component: Arboles_tarjetasComponent;
  let fixture: ComponentFixture<Arboles_tarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Arboles_tarjetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Arboles_tarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
