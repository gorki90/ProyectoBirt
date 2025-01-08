import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasometricDataComponent } from './dasometric-data.component';

describe('DasometricDataComponent', () => {
  let component: DasometricDataComponent;
  let fixture: ComponentFixture<DasometricDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasometricDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasometricDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
