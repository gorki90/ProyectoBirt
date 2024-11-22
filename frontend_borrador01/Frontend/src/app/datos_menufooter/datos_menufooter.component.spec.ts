import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufooterComponent } from './datos_menufooter.component';

describe('MenufooterComponent', () => {
  let component: MenufooterComponent;
  let fixture: ComponentFixture<MenufooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenufooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenufooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
