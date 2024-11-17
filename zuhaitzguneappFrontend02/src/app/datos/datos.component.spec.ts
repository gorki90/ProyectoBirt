import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos_menuComponent, } from '../datos_menu/datos_menu.component';
import { Datos_menufooterComponent } from '../datos_menufooter/datos_menufooter.component';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
