export class Trabajo{
    //atributos
    public tipoTrabajo: string;
    public precioHora: number;
    public cantidadHoras: number;
    public factura: boolean;

    //constructor
    constructor(tipoTrabajo: string, precioHora: number, cantidadHoras: number, factura: boolean){
        this.tipoTrabajo=tipoTrabajo;
        this.precioHora=precioHora;
        this.cantidadHoras=cantidadHoras;
        this.factura=factura;
    }

    //metodos
    public getPrecioTrabajo(): number{
        return this.cantidadHoras*this.precioHora;
    }
}