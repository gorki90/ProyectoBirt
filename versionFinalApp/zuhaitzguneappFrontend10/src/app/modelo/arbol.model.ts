import { Task } from "./task.model";

export class Arbol {
    [key: string]: any; // Permite acceder dinámicamente a las propiedades
    constructor(
        
        public especie:string,
        public nombre_comun: string,
        public barrio: string,
        public calle: string,
        public codigo: string,
        public coordenadaX: number,
        public coordenadaY: number,
        public notas_ubicacion: string,
        public id?: string,
        public foto?: string, // Propiedad opcional
        public imageUrl?: string, // Propiedad para la URL de la imagen procesada
        public tasks?: Task[],
        public altura?: number,
        public diametro?: number,
        public estado?: string,
        public altura_primera_rama?: number,
        public disposicion?: string,
        public enfermedades?: string,
        public morfologia?: string,
        public plagas?: string,
        public riesgos?: string,
        public afecciones_abioticas?: string,
        public tipo_alcorque?: string,
        public notas?: string,
    ){}
}