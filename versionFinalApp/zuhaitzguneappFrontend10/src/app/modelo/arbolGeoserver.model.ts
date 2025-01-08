export class ArbolGeoserver {
    constructor(
        public id: number,
        public especie:string,
        public nombre_comun: string,
        public barrio: string,
        public calle: string,
        public codigo: string,
        public geometry:any,
        public notas_ubicacion: string,
        public foto: string, // Propiedad opcional
    ){}
}