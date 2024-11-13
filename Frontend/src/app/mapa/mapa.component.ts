import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
//ADDING MARKERS
import { fromLonLat } from 'ol/proj';//          This function converts longitude and latitude coordinates to the map's default projection (EPSG:3857).
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';//             Used to create a new marker feature at specified coordinates.
import Style from 'ol/style/Style';//            Defines the style for the marker, including the icon image and anchor point.
import Icon from 'ol/style/Icon';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-mapa',
  //  templateUrl: './mapa.component.html',
  //  styleUrl: './mapa.component.css'
//  template: '<div id="map" class="map"></div>',
templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map!: Map;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor(_route: ActivatedRoute,_router: Router ){
    this._route=_route;
    this._router=_router;
  
  }
/*  arbol(nombre: string, p0?: { nombre: any; }){
    this._router.navigate(['/arboles', nombre]); //también se le podrían pasar parámetros (nombre)
  }
    */
  arbol(id: number, altura: number, diametro: number, nombre: string, p0?: { id: any; altura: any; diametro: any; nombre: any; }){
    this._router.navigate(['/arboles',id,altura,diametro,nombre]); //también se le podrían pasar parámetros (nombre)
  }
  ngOnInit(): void {
    // Coordenadas de longitud y latitud para centrar el mapa (por ejemplo, Nueva York)
    //                          Sistema	Latitud	Longitud
    //          Estándar decimal simple	43.26271	-2.92528
    //    const centerCoordinates = fromLonLat([-74.006, 40.7128]); // Coordenadas de Nueva York
    //    const centerCoordinates = fromLonLat([-2.92528,43.26271]); // Coordenadas de BILBAO
    //const centerCoordinates = fromLonLat([-2.934349019846798,43.24486051973659]);// Coordenadas de LARRASKITU 2
    const centerCoordinates = fromLonLat([-2.9345263852772017, 43.245028850624685]);
    this.map = new Map({
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: centerCoordinates, // Centrar el mapa en las coordenadas especificadas
        zoom: 20 // Establecer el nivel de zoom deseado (ajusta según tus necesidades)
        //        center: [0, 0],
        //        center: [-2.92528,43.26271],
        //        zoom: 0 //El nivel de zoom varía de 0 (mundo entero) a 28 (nivel máximo de detalle). Puedes ajustarlo según el nivel de detalle que desees.
      })
    });
    // Create a feature (marker)
    const marker = new Feature({
      //          geometry: new Point(fromLonLat([0, 0])) // Add the marker at longitude 0, latitude 0
      //          geometry: new Point(fromLonLat([-2.92528,43.26271])) //BILBAO
      geometry: new Point(fromLonLat([-2.9345263852772017, 43.245028850624685])), //LARRASKITU 2 ventana
      id: 1,
      altura:20,
      diametro:30,
      nombre: 'LARRASKITU 2 ventana'
    });

    const marker2 = new Feature({
      //          geometry: new Point(fromLonLat([0, 0])) // Add the marker at longitude 0, latitude 0
      //          geometry: new Point(fromLonLat([-2.92528,43.26271])) //BILBAO
      geometry: new Point(fromLonLat([-2.934486408597113,43.24484787134856])), //LARRASKITU 2 portal
      id: 2,
      altura:34,
      diametro:20,
      nombre: 'LARRASKITU 2 portal'
    });
    // Style the marker
    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],//ajusta el punto de anclaje del ícono. El valor [0.5, 1] ancla el ícono en el centro inferior, pero puedes cambiarlo según tus necesidades.
        src: 'assets/marker-icon.png', // Path to your marker icon image
        scale: 0.05 // Escala del ícono, donde 1 es el tamaño original; usa un valor menor para reducir el tamaño
      })
    }));

    marker2.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],//ajusta el punto de anclaje del ícono. El valor [0.5, 1] ancla el ícono en el centro inferior, pero puedes cambiarlo según tus necesidades.
        src: 'assets/marker-icon.png', // Path to your marker icon image
        scale: 0.05 // Escala del ícono, donde 1 es el tamaño original; usa un valor menor para reducir el tamaño
      })
    }));

    // Create a vector source and layer for the marker
    const vectorSource2 = new VectorSource({
      features: [marker2]
    });

    const markerLayer2 = new VectorLayer({
      source: vectorSource2
    });

        // Create a vector source and layer for the marker
        const vectorSource = new VectorSource({
          features: [marker]
        });
    
        const markerLayer = new VectorLayer({
          source: vectorSource
        });

    // Add the marker layer to the map
    this.map.addLayer(markerLayer);

        // Add the marker layer to the map
        this.map.addLayer(markerLayer2);

    // Manejar clics en el mapa
    this.map.on('click', (event) => {
      // Buscar características (features) en la posición clicada
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        if (feature) {
          // Puedes acceder a las propiedades del marcador
          const id: number = feature.get('id');
          const altura: number = feature.get('altura');
          const diametro: number = feature.get('diametro');
          const nombre: string = feature.get('nombre');
//          alert(`Hiciste clic en el marcador: ${nombre}`);
          this.arbol(id,altura,diametro,nombre);
        }
      });
    });


  }
}

