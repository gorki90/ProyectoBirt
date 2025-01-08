import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAtributosComponent } from './mostrar-atributos.component';

describe('MostrarAtributosComponent', () => {
  let component: MostrarAtributosComponent;
  let fixture: ComponentFixture<MostrarAtributosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarAtributosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
