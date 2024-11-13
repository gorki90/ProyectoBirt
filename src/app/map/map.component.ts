// componente que muestra el geoJson que he desarrollado en laravel
// muestra dos puntos en Larraskitu
import { Component } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  private http = inject(HttpClient);

  map!: Map;

  ngOnInit(): void {
    this.initializeMap();
    this.loadGeoJsonData();
  }

  initializeMap(): void {
    // Inicializar el mapa con capa OSM y vista centrada
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
//        center: fromLonLat([-3.70379, 40.41678]), // Coordenadas de ejemplo (Madrid)
        center: fromLonLat([-2.9345263852772017, 43.245028850624685]), // Coordenadas de ejemplo (LARRASKITU)
//        zoom: 5
        zoom: 20
      })
    });
  }

  loadGeoJsonData(): void {
    // Cargar el GeoJSON desde el endpoint
    this.http.get('http://localhost:8000/api/test').subscribe((geoJsonData: any) => {
      console.log(geoJsonData);
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJsonData, {
          featureProjection: 'EPSG:3857' // Asegura la proyección correcta para OpenLayers
        })
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

      this.map.addLayer(vectorLayer);
    });
  }
}
