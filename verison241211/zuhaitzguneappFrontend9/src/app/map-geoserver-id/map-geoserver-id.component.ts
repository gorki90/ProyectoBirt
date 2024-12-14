import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS, Vector, WMTS, XYZ } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
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
import { FormsModule } from '@angular/forms';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-map-geoserver-id',
  templateUrl: './map-geoserver-id.component.html',
  styleUrl: './map-geoserver-id.component.css'
})
export class MapGeoserverIdComponent implements OnInit {
  private map!: Map;
  private wfsLayer!: VectorLayer;
  isEditMode: boolean = false; // Variable para el modo de edición
  isCreateMode: boolean = false; 
  private attributes!:any;
  barrioCalle!: any;  // Para buscar por barrio o calle
  codigo!: any;       // Para buscar por código
  barrios!:any;
  errorBarrio:boolean = false;
  errorCodigo:boolean = false;
  //propiedades para geolocalizacion
  private userLocationFeature!: Feature; // Feature para representar la ubicación del usuario
  private userLocationLayer!: VectorLayer; // Capa para mostrar la ubicación del usuario

  constructor(private wfsService: WfsService,
              private wfsService1: WfsService,
              private bbddData: WfsService,
              private attributeService: AtributoService,
              private datosArbol: AtributoService,
              private editMode: AtributoService,
              private idArbol: AtributoService,
              private router: Router
  ) {}

  ngOnInit(): void {
    
    const osmLayer = new TileLayer({
      source: new OSM(),
      
      opacity: 0.4, // Sin opacidad, todo es completamente visible
      });

    // Capa de ortofoto de Esri
    const wmtsLayer = new TileLayer({
      source: new WMTS({
        url: 'https://www.geo.euskadi.eus/geoeuskadi/rest/services/U11/WMTS_ORTO/MapServer/WMTS',
        layer: 'U11_WMTS_ORTO',
        matrixSet: 'default028mm',
        format: 'image/png',
        projection: 'EPSG:3857',
        tileGrid: new WMTSTileGrid({
          origin: [-20037508.342787, 20037508.342787],
          resolutions: [
            156543.033928041,
            78271.5169640205,
            39135.75848201025,
            19567.879241005125,
            9783.939620502562,
            4891.969810249364,
            2445.984905124682,
            1222.992452562336,
            611.496226281303,
            305.74811314051954,
            152.8740565703918,
            76.43702828506358,
            38.21851414253179,
            19.109257071265894,
            9.554628535632947,
            4.777314267948769,
            2.3886571339743794,
            1.1943285668548997,
            0.5971642835597418,
            0.2985821416475794,
            0.14929107082378953

          ],
          matrixIds: ['0', '1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
        }),
        style: 'default',
        crossOrigin: 'anonymous', // Correcto
      }),
    });
    this.wfsLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Icon({
          src: "/assets/img/planta.png",
          scale: 0.3,
          anchor: [0.5, 0.5],
        }),
      }),
    });
    // genero el objeto mapa donde estará la capa obtenida del servicio wfs y el fondo OSM
    this.map = new Map({
      target: 'map',
      layers: [wmtsLayer,osmLayer, this.wfsLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 8,
        maxZoom: 25,  // Nivel de zoom máximo
        minZoom: 3,   // Nivel de zoom mínimo
        projection: 'EPSG:3857',
      }),
    });

    this.loadFeatures(); // Carga las características al iniciar
    this.setupClickHandler();
    // Configuro el evento 'moveend' para actualizar la capa al mover el mapa
    this.map.on('moveend', () => {
      this.cargarDatosSegunExtension();
    });
    
      // Añadir marcador para la ubicación del usuario
    this.initUserLocation();
  }
  private cargarDatosSegunExtension(): void {
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    console.log('Extensión visible:', extent);

    // Llama al servicio WFS con la extensión calculada
    this.wfsService1.loadFeatures(extent).subscribe({
      next: (data) => {
        console.log('Datos cargados para la extensión:', data);
        this.actualizarCapaConDatos(data);
      },
      error: (err) => console.error('Error al cargar los datos para la extensión:', err)
    });
  }
  private actualizarCapaConDatos(data: any): void {
    if (!data) {
      console.warn('No se han obtenido datos para la extensión visible.');
      return;
    }

    const source = this.wfsLayer.getSource();
  if (source) {
    source.clear(); // Limpiar capa
    const features = new GeoJSON().readFeatures(data, {
      featureProjection: 'EPSG:3857',
    });
    source.addFeatures(features); // Añadir nuevas características
  } else {
    console.error('La fuente de la capa WFS es null');
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
    
      // Obtener la extensión de todas las características cargadas
      const extent = (this.wfsLayer.getSource() as VectorSource).getExtent();
    // Aumentar la extensión para que sea un poco más grande
      const margin = 20; // Ajustar este valor según se necesites, en unidades del sistema de coordenadas (EPSG:3857)
      const extendedExtent = [
        extent[0] - margin, // Extender hacia la izquierda
        extent[1] - margin, // Extender hacia abajo
        extent[2] + margin, // Extender hacia la derecha
        extent[3] + margin  // Extender hacia arriba
    ];
      // Ajustar la vista para que se adapte a la extensión de las características
      this.map.getView().fit(extendedExtent, { size: this.map.getSize() });

      // Calcular el centro de la extensión
      const centerX = (extent[0] + extent[2]) / 2;
      const centerY = (extent[1] + extent[3]) / 2;

      // Centrar la vista en el centro de la capa
      this.map.getView().setCenter([centerX, centerY]);
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
                console.log('componente map',data);
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
        console.log(coordinates);
          // Agregar el punto al mapa
        this.addPointToMap(coordinates);
        this.attributeService.setNewTreeCoordinates(coordinates);
        this.editMode.setEditMode(false);
        this.router.navigate(['/formulario-definitivo']); // Navegar al formulario de creación
      }
      
    });
  }
  private addPointToMap(coordinates: any | null): void {
    const newFeature = new Feature({
      geometry: new Point(coordinates),
    });

    newFeature.setStyle(
      new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'blue' }),
          stroke: new Stroke({ color: 'black', width: 1 }),
        }),
      })
    );
    // Añadir el nuevo punto a la fuente de la capa
    (this.wfsLayer.getSource() as VectorSource).addFeature(newFeature);
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
    // Buscar arboles en el mapa por barrio--------------------------------------------------------------
    // Llamado cuando se pulsa el boton buscar
    onSearchClick(filterType: 'barrioCalle' | 'codigo'): void {
      if (filterType === 'barrioCalle') {
        // Si el campo no está vacío, buscar por barrio o calle
        this.errorCodigo=false;
        this.errorBarrio=false;
        if (this.barrioCalle == '' || this.barrioCalle == null) {
          this.errorBarrio=true;
        } else {
            this.wfsService.isBarrioSearch(this.barrioCalle).subscribe({
              next: searchType => {
                this.filtrarPorLocalizacion(searchType, this.barrioCalle); // Usamos 'searchType' ('barrio' o 'calle')
                this.barrioCalle='';
              }
            })
        };
      } else if (filterType === 'codigo') {
        this.errorCodigo=false;
        this.errorBarrio=false;
        if (this.codigo =='' || this.codigo == null ) {
          this.errorCodigo=true;
        } else {
        // Si el filtro es por código
          this.filtrarPorLocalizacion('codigo', this.codigo);
          this.codigo='';
        }
      }
    }

    // Función para obtener árboles filtrados por nombre de calle
    filtrarPorLocalizacion(filterType: 'barrio' | 'codigo' | 'calle', filterValue: string): void {
      this.wfsService.getFeaturesLocalizacion(filterType, filterValue).subscribe({
        next: (data) => {
      console.log('datos',data);
        const features = new GeoJSON().readFeatures(data, {
          featureProjection: 'EPSG:3857', // Proyección del mapa
        });
        console.log('features',filterValue);
        // comprueba que se obtiene algun dato valido
        if ((filterType == 'barrio' || filterType == 'calle') && features.length==0) {
          this.errorBarrio=true;
        } else if (filterType == 'codigo' && features.length==0){
          this.errorCodigo=true;
        } else {
          // Limpiar las características existentes de la capa
          const source = this.wfsLayer.getSource() as VectorSource;
          source.clear();  // Limpiar la capa para agregar nuevas características

          // Añadir las nuevas características filtradas
          source.addFeatures(features);

          // Obtener la extensión de las características filtradas
          const extent = source.getExtent();

          // Asegurar que el área visible sea más grande que la extensión de los datos
          const margin = 25;
          const extendedExtent = [
            extent[0] - margin,
            extent[1] - margin,
            extent[2] + margin,
            extent[3] + margin,
          ];

          // Ajustar la vista para que se adapte a la extensión de los árboles filtrados
          this.map.getView().fit(extendedExtent, { size: this.map.getSize() });

          // Calcular el centro de la extensión filtrada
          const centerX = (extendedExtent[0] + extendedExtent[2]) / 2;
          const centerY = (extendedExtent[1] + extendedExtent[3]) / 2;

          // Centrar la vista en el centro de la extensión filtrada
          this.map.getView().setCenter([centerX, centerY]);
      }
    },
    error: err => {
      console.log('error en la conexion', err);
    }
  });
  }
  //--------------------------------------------------------------------------
  // geolocalizacion
  private initUserLocation(): void {
    // Inicializar capa para mostrar la ubicación del usuario
    this.userLocationLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: 'blue' }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      }),
    });
    //agrego la capa con el punto que geolocaliza al mapa
    this.map.addLayer(this.userLocationLayer);
    //genero un objeto de la clase Feature que representa una entidad geoespacial
    // una Feature puede contener una geometría 
    // (como un punto, línea o polígono) y un conjunto de atributos o propiedades asociadas.
    this.userLocationFeature = new Feature();
    // agrega la Feature (el marcador de la ubicación del usuario) al origen de datos (source) 
    // de una capa vectorial, que es responsable de gestionar y almacenar las entidades geográficas.
    (this.userLocationLayer.getSource() as VectorSource).addFeature(this.userLocationFeature);
  
    // Seguir la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const coords = [position.coords.longitude, position.coords.latitude];
          const transformedCoords = fromLonLat(coords, 'EPSG:3857');
          console.log("Coordenadas geolocalizadas (lon, lat):", coords); 
          console.log("Coordenadas transformadas (EPSG:3857):", transformedCoords);
          // Actualizar la geometría del marcador
          this.userLocationFeature.setGeometry(new Point(transformedCoords));
  
          // Centrar el mapa en la nueva ubicación
          this.map.getView().setCenter(transformedCoords);
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);
        },
        {
          enableHighAccuracy: true, // Más precisión (puede consumir más batería)
          maximumAge: 0, // No usar ubicaciones antiguas
          timeout: 5000, // Tiempo máximo de espera para obtener la ubicación
        }
      );
    } else {
      console.warn('La geolocalización no está soportada en este navegador.');
    }
  }

  isAuthenticated(): boolean {
    return this.wfsService.isAuthenticated();
  }

}




