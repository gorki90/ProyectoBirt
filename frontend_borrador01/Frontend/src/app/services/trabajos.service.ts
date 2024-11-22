import { Injectable } from '@angular/core';
import { Trabajo } from "../models/Trabajo";

@Injectable()
export class TrabajosService{

    public trabajos: Array<Trabajo>;

    constructor(){
        this.trabajos=[
            new Trabajo("Fontaneria",10,5,false),
            new Trabajo("Electricidad",3,10,true),
            new Trabajo("Albañileria",24,7,false)
        ];
    }

    getTrabajos(): Array<Trabajo>{
        return this.trabajos;
    }

}