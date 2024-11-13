// en este compoenente se muestra la capa del servicio WFS en un mapa
// se genera un evento de click que al clikar en un arbol se obtienen sus datos
// la servicio WFS se accede por el servicio Wfsservice
// en este servicio se accede al geoserver y se inyecta en este componente para
// que mediante suscripcion se acceda a los datos
// IMPORTANTE obervar que hay que incluir el servicio en provider, sin embargo, para compartir los datos entre
// componentes mediante el servicio AtributoService no se incluye en providers para que los datos se puedan acceder desde
// los 2 componentes (map-geosewrver.component, que es donde se obtienen los datos, y mostrar-atributos.component que es
// donde se muestran). Si se incluyera en provider se crearían instancias diferentes en cada componente.
import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { WfsService } from '../servicio/wfs.service';
import { HttpClientModule } from '@angular/common/http';
import { AtributoService } from '../servicio/atributo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map-geoserver-wfs',
  standalone: true,
  imports: [HttpClientModule],
  providers: [WfsService],
  templateUrl: './map-geoserver-wfs.component.html',
  styleUrl: './map-geoserver-wfs.component.css'
})
export class MapGeoserverWFSComponent implements OnInit {
  private map!: Map;
  private wfsLayer!: VectorLayer;

  constructor(private wfsService: WfsService,
    private attributeService: AtributoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    this.wfsLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 1 }),
        }),
      }),
    });
    //calculo el centro de la capa para que sea el centro de la vista
    //    const extent = [-3.1243420841541174,43.2095838047188, -3.124183586779631, 43.20962666631764]; // valores reales del encuadre nativo
    const extent = [-2.9345523651976593, 43.245006495955934, -2.9344212673108827, 43.24508829095301]; // valores reales del encuadre nativo
    const centerX = (extent[0] + extent[2]) / 2;
    const centerY = (extent[1] + extent[3]) / 2;
    this.map = new Map({
      target: 'map',
      layers: [osmLayer, this.wfsLayer],
      view: new View({
        center: fromLonLat([centerX, centerY]),
        zoom: 20,
        projection: 'EPSG:3857',
      }),
    });

    this.loadFeatures(); // Cargar las características al iniciar
    this.setupClickHandler();
  }

  // Método para cargar las características usando el servicio
  private loadFeatures(): void {
    // obtengo los datos del geoserver
    this.wfsService.getFeatures().subscribe((data) => {
      const features = new GeoJSON().readFeatures(data, {
        featureProjection: 'EPSG:3857', // Proyección del mapa
      });
      (this.wfsLayer.getSource() as VectorSource).addFeatures(features); // Añadir las características al mapa
    });
  }

  private setupClickHandler(): void {
    this.map.on('singleclick', (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const attributes = feature.getProperties();
        console.log("Atributos del árbol:", attributes); //muestro los atributos por consola
        this.attributeService.updateAttributes(attributes); // Guardar los atributos en el servicio
        this.router.navigate(["/lista"]);// navego al compenente donde muestro los datos

      });
    });
  }
}

