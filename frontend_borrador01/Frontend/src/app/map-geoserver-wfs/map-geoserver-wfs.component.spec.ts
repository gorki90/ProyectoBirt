import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGeoserverWFSComponent } from './map-geoserver-wfs.component';

describe('MapGeoserverWFSComponent', () => {
  let component: MapGeoserverWFSComponent;
  let fixture: ComponentFixture<MapGeoserverWFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapGeoserverWFSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapGeoserverWFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
