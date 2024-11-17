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
  selector: 'app-map-geoserver-id',
  standalone: true,
  imports: [HttpClientModule],
  providers: [WfsService],
  templateUrl: './map-geoserver-id.component.html',
  styleUrl: './map-geoserver-id.component.css'
})
export class MapGeoserverIdComponent implements OnInit {
  private map!: Map;
  private wfsLayer!: VectorLayer;
  isEditMode: boolean = false; // Variable para el modo de edición
  isCreateMode: boolean = false;
  private attributes!: any;

  constructor(private wfsService: WfsService,
    private bbddData: WfsService,
    private attributeService: AtributoService,
    private datosArbol: AtributoService,
    private editMode: AtributoService,
    private idArbol: AtributoService,
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
        zoom: 19,
        projection: 'EPSG:3857',
      }),
    });

    this.loadFeatures(); // Cargar las características al iniciar
    this.setupClickHandler();
  }
  // Alternar el modo de creación
  toggleCreateMode(): void {
    this.isCreateMode = !this.isCreateMode;
    if (this.isCreateMode) {
      this.isEditMode = false; // Desactivar el modo de edición
    }
  }
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.isCreateMode = false; // Desactivar el modo de creación
    }
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
      let featureClicked = false;
      // comprobamos si hay carcateristicas en el pixel que pulsamos
      this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        // si hay caracteristicas es que hay un arbol por lo que la variable featureClicked=true
        if (feature) {
          featureClicked = true;
          // guardamos las caracteristicas en una variable
          this.attributes = feature.getProperties();
          console.log("Atributos del árbol:", this.attributes)
        }
      });
      if (!this.isEditMode && !this.isCreateMode && this.attributes) {
        this.attributeService.updateAttributes(this.attributes);
        this.router.navigate(["/lista"]);
      }
      // En modo de edición, revisamos si se hizo clic en un árbol para editarlo
      if (this.isEditMode && this.attributes) {

        this.bbddData.getFeaturesId(this.attributes['id']).subscribe({
          next: data => {
            console.log('componente map', data);
            this.editMode.setEditMode(true);
            this.idArbol.setId(this.attributes['id']);
            console.log('id', this.attributes['id']);
            this.datosArbol.updateAttributes(data);
            this.router.navigate(['/formulario-definitivo'])
          }
        })

      }
      // Si estamos en modo de edición y no se hizo clic en un árbol, iniciamos el proceso de creación
      if (this.isCreateMode && !featureClicked) {
        const coordinates = evt.coordinate;
        this.attributeService.setNewTreeCoordinates(coordinates);
        this.editMode.setEditMode(false);
        this.router.navigate(['/formulario-definitivo']); // Navegar al formulario de creación
      }
    });
  }
}



