// muestra una imagen del servicio WMS de geoserver
import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Tile as TileSource } from 'ol/source';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-map-geoserver-wms',
  standalone: true,
  imports: [],
  templateUrl: './map-geoserver-wms.component.html',
  styleUrl: './map-geoserver-wms.component.css'
})
export class MapGeoserverWMSComponent implements OnInit {
  map: Map | undefined;

  ngOnInit(): void {
    // Configura la vista del mapa en EPSG:3857
    //const extent = [-3.1243420841541174,43.2095838047188, -3.124183586779631, 43.20962666631764]; // valores reales del encuadre nativo
    const extent = [-2.9345523651976593, 43.245006495955934, -2.9344212673108827, 43.24508829095301]; // valores reales del encuadre nativo
    const centerX = (extent[0] + extent[2]) / 2;
    const centerY = (extent[1] + extent[3]) / 2;
    const view = new View({
      center: olProj.fromLonLat([centerX, centerY ]), // establece el centro de la vista
      zoom: 20,
      projection: 'EPSG:3857' // Usa la proyección por defecto de OpenLayers
    });

    // Capa base de OSM
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // Capa WMS de GeoServer
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms', // Ajusta la URL al servidor GeoServer
        params: {
//          'LAYERS': 'abolesejemplo:arbolesejemplo', // nombre del espacio de trabajo y la capa
          'LAYERS': 'larraskitu:larraskitu', // nombre del espacio de trabajo y la capa
          'TILED': true,
          'SRS': 'EPSG:3857' // 
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous' // Para evitar problemas de CORS
      }),
      opacity: 0.7 // Ajusta la opacidad según tus preferencias
    });

    // Configura el mapa con las capas
    this.map = new Map({
      target: 'map',
      layers: [osmLayer, wmsLayer],
      view: view
    });
  }
}

