import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos_menufooterComponent } from './datos_menufooter.component';

describe('MenufooterComponent', () => {
  let component: Datos_menufooterComponent;
  let fixture: ComponentFixture<Datos_menufooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos_menufooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Datos_menufooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
