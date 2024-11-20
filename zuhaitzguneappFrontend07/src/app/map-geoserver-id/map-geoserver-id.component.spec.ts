import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGeoserverIdComponent } from './map-geoserver-id.component';

describe('MapGeoserverIdComponent', () => {
  let component: MapGeoserverIdComponent;
  let fixture: ComponentFixture<MapGeoserverIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapGeoserverIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapGeoserverIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
