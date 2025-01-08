import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPrincipalComponent } from './formulario-principal.component';

describe('FormularioPrincipalComponent', () => {
  let component: FormularioPrincipalComponent;
  let fixture: ComponentFixture<FormularioPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
