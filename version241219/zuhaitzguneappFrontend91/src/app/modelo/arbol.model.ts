import { Task } from "./task.model";

export class Arbol {
    constructor(
        public id: string,
        public especie:string,
        public nombre_comun: string,
        public barrio: string,
        public calle: string,
        public codigo: string,
        public coordenadaX: number,
        public coordenadaY: number,
        public notas_ubicacion: string,
        public foto?: string, // Propiedad opcional
        public imageUrl?: string, // Propiedad para la URL de la imagen procesada
        public tasks?: Task[]

    ){}
}