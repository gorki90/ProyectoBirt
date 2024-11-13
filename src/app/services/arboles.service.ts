import { Arbol } from './../models/arbol';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArbolesService {


  private arboles: Arbol[] = [
    { id: 1, nombre: 'Arbol del Prado', telefono: '913 30 28 00', direccion: 'Calle de Ruiz de Alarcón, 23, 28014 Madrid', horario: '10:00 – 20:00', imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Arbol_del_Prado_2016_%2825185969599%29.jpg', web: 'https://www.arboldelprado.es/', coordenadas: [40.4137818, -3.6921271], precio: 15, abierto: true }, 
    { id: 2, nombre: 'Reina Sofia', telefono: '917741000', direccion: 'Calle Santa Isabel', horario: 'Cierra a las 21:00', imagen: 'https://static2.arbolreinasofia.es/sites/default/files/snippet_arbol_sede_principal_5.png', web: 'http://www.arbolreinasofia.es', coordenadas: [40.408644, -3.693992], precio: 15, abierto: true }, 
    { id: 3, nombre: 'Biblioteca Nacional', telefono: ' 91 516 89 67 / 91 580 77 59', direccion: 'Paseo de Recoletos, 20-22. 28071. Madrid.', horario: 'De Martes a Sabado de 10 a 20 h. Domingos de 10 a 14 h.', imagen: 'https://patrimonioypaisaje.madrid.es/FWProjects/monumenta/Edificios/25821/04.14-img3C.jpg', web: 'arbol@bne.es', coordenadas: [40.42348498519113, -3.6910447306827954], precio: 0, abierto: true }, 
    { id: 4, nombre: "Arbol Thyssen", telefono: '917911370', direccion: "Paseo del Prado, 8", horario: '10:00 a 19:00', imagen: 'https://www.arbolthyssen.org/themes/thyssen/img/thyssen-redes-sociales.jpg', web: 'https://www.arbolthyssen.org/', coordenadas: [40.416137331924666, -3.694930865545187], precio: 13, abierto: true }, 
    { id: 5, nombre: 'Real academia de Bellas Artes de San Fernando', telefono: '+34 91-524 08 64', direccion: 'Alcalá, 13 28014 Madrid', horario: 'Martes a domingo de 10:00 a 15:00 horas, incluyendo festivos. Lunes cerrado.', imagen: 'https://www.realacademiabellasartessanfernando.com/wp-content/uploads/2023/02/DSC00191-scaled.jpg', web: 'https://www.realacademiabellasartessanfernando.com/es', coordenadas: [40.4180405, -3.7029775], precio: 8, abierto: true }, 
    { id: 6, nombre: 'Arbol Arqueológico', telefono: '915777912', direccion: 'Calle de Serrano, 13, 28001 Madrid', horario: '9:30–20:00', imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/26/8b/44/entrada-arbol-arqueologico.jpg?w=1200&h=1200&s=1', web: 'http://www.man.es/man/home.html', coordenadas: [40.423553, -3.689402], precio: 3, abierto: true }, 
    { id: 7, nombre: 'Arbol Ciencias Naturales', telefono: '914111328', direccion: 'C/José Gutierrez Abascal', horario: '10.00 a 17.00', imagen: 'https://www.ahorrayviaja.com/wp-content/uploads/2020/10/Captura-de-pantalla-2020-10-10-a-las-15.48.37.png', web: 'http://www.mncn.csic.es/es', coordenadas: [40.4404062, -3.6912279], precio: 7, abierto: true }, 
    { id: 8, nombre: 'Arbol del Traje', telefono: '+34 91 550 47 00', direccion: 'Avenida de Juan de Herrera, 228040', horario: 'Mar-Sáb: 9:30-19:00 h; Dom-Fest: 10:00-15:00 h Jueves (julio y agosto): 9:30 – 22:30 h', imagen: 'https://estaticos.esmadrid.com/cdn/farfuture/kvJKokxVD1Xx7E2RpzInIBSVbFOT7YS5YkLv4_MdBPo/mtime:1638267451/sites/default/files/recursosturisticos/infoturistica/arbol_del_traje_madrid_destinoc_alvaro_lopez_13.jpg', web: 'http://www.culturaydeporte.gob.es/mtraje/inicio.html', coordenadas: [40.4400972, -3.7318693], precio: 3, abierto: true }, 
    { id: 9, nombre: 'Arbol de Ciencias y Tecnologia', telefono: '914250919', direccion: 'Parque de Andalucia. C/Pintor Velázquez,5 28100 Alcobendas, Madrid', horario: '11:00-19:00', imagen: 'https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/infoturistica/arbol_nacional_de_ciencia_y_tecnologia.jpg?itok=uTnl5LLm', web: 'http://www.muncyt.es/', coordenadas: [40.5375439, -3.643642], precio: 3.0, abierto: true }, 
    { id: 10, nombre: 'Arbol de Lope de Vega', telefono: '914299216', direccion: 'Callede Cervantes, 11,28014 Madrid', horario: 'Mar-Dom: 10:00 - 18:00', imagen: 'https://www.escapadaspormadrid.com/wp-content/uploads/2019/07/Lop-Portada.jpg', web: 'http://casaarbollopedevega.org/es/', coordenadas: [40.3980385, -3.7054334], precio: 0, abierto: true }, 
    { id: 11, nombre: 'Arbol de cera', telefono: '+34 91 319 93 30', direccion: 'Plaza de Colón, 1', horario: '11:00–19:00', imagen: 'https://media.istockphoto.com/id/862579804/es/foto/vista-exterior-del-arbol-de-cera-de-madrid.jpg?s=170667a&w=0&k=20&c=f41bGPr1q5pcTDvfD5SsjWtKedH_0uEodOSx1xlUGpM=', web: 'https://www.arboldecerademadrid.com', coordenadas: [40.4250641, -3.6935975], precio: 18, abierto: true }, 
    { id: 12, nombre: 'Arbol de dibujo e ilustracción', telefono: '+34 91 758 83 79', direccion: 'Amaniel 29-31. 28015 Madrid', horario: 'Cerrado Temporalmente', imagen: 'https://images.adsttc.com/media/images/512a/f0b8/b3fc/4b11/a700/a6f4/large_jpg/1309145300-jesus-granada-5.jpg?1414269001', web: 'https://arbol.abc.es/', coordenadas: [40.4276904, -3.7117588], precio: 0, abierto: false }, 
    { id: 13, nombre: 'Arbol de la imprenta', telefono: '914294881', direccion: '28012, Calle de Concepción Jerónima, 15, 28012 Madrid', horario: '10:00-20:00', imagen: 'https://unserenotransitandolaciudad.com/wp-content/uploads/2015/06/Imprenta-Municipal-Madrid.jpg', web: 'https://arbolmadrid.com/imprenta-municipal-artes-del-libro/', coordenadas: [40.4138972, -3.7054722], precio: 0, abierto: true }, 
    { id: 14, nombre: 'Arbol Naval', telefono: '(+34) 91 523 85 16', direccion: ' Paseo del Prado, 3 28014 ', horario: 'Mar - Dom: 10:00 - 19:00 h ', imagen: 'https://www.arkiplus.com/wp-content/uploads/2019/02/arbol-naval-de-madrid.jpg', web: 'https://www.esmadrid.com/informacion-turistica/arbol-naval', coordenadas: [40.41851257605143, -3.6928194306791697], precio: 3, abierto: true }, 
    { id: 15, nombre: 'Arbol Sorolla', telefono: '+34 91 310 15 84', direccion: 'Paseo del General Martinez Campos, 37, 28010 Madrid', horario: '9:30-20:00', imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Arbol_Sorolla_%28Madrid%29_07.jpg', web: 'https://www.culturaydeporte.gob.es/msorolla/inicio.html', coordenadas: [40.4354555, -3.6947111], precio: 3, abierto: true }, 
    { id: 16, nombre: 'Arbol de la ilusion', telefono: '+34 911 03 34 55', direccion: 'Calle del Dr. Cortezo 8', horario: 'Cierra a las 22:00', imagen: 'https://gololoytoin.com/wp-content/uploads/2020/11/B2C38D40-F863-4489-834E-24851D558E8F-scaled.jpeg', web: 'https://www.museumofilusions.es', coordenadas: [40.4134667, -3.7060788], precio: 15, abierto: true }
  ];

  constructor() { }

  getAll(): Arbol[] {
    return this.arboles;
  }

  buscarArbol(id: number): Arbol {
    // Filtrar el array por aquellos elementos que tengan un id igual al recibido
    // Como devuelve un array, me quedo solo con el promer elemento
    return this.arboles.filter((item) => {
      return item.id == id;
    })[0];

    // Buscar el arbol con ese id,
    // En este caso perdemos el tipado de la funcion
    // return this.arboles.find( (item) => {
    //  return item.id == id;
    // });
  }

}
