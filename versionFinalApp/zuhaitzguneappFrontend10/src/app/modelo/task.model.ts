export class Task {
    constructor(
        
        public id:number,
        public tipo_accion: string,
        public descripcion_accion: string,
        public prioridad: string,
        public estado_accion: string,
        public fecha_comienzo: string,
        public fecha_limite: string,
        
        public arbol_id?: number,

    ){}
}