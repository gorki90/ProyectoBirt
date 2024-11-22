import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGeoserverWMSComponent } from './map-geoserver-wms.component';

describe('MapGeoserverWMSComponent', () => {
  let component: MapGeoserverWMSComponent;
  let fixture: ComponentFixture<MapGeoserverWMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapGeoserverWMSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapGeoserverWMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
