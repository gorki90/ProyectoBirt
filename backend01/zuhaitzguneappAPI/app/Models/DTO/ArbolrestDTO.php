<?php

namespace App\Models\DTO;

class ArbolrestDTO
{
    public $id;
    public $codigo;
    public $especie;
    public $nombre_comun;
    public $barrio;
    public $calle;
    public $notas;
    public $coordenadaX;
    public $coordenadaY;
    public $datosDasometricos;
    public $estadoSanitario;
    public $tareas;

    public function __construct($arbol)
    {
        // Asignar los datos principales del árbol
        $this->id = $arbol->id;
        $this->codigo = $arbol->codigo;
        $this->especie = $arbol->especie;
        $this->nombre_comun = $arbol->nombre_comun;
        $this->barrio = $arbol->barrio;
        $this->calle = $arbol->calle;
        $this->notas = $arbol->notas;
        $this->coordenadaX = $arbol->coordenadax;
        $this->coordenadaY = $arbol->coordenaday;
        // Asignar las relaciones
        $this->datosDasometricos = $arbol->datosDasometricos;
        $this->estadoSanitario = $arbol->estadoSanitario;
        $this->tareas = $arbol->tareas;
    }

    // Método para convertir el DTO a un array, útil para la respuesta JSON
    public function toArray()
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'especie' => $this->especie,
            'nombre_comun' => $this->nombre_comun,
            'barrio' => $this->barrio,
            'calle' => $this->calle,
            'notas' => $this->notas,
            'coordenadaY' => $this->coordenadaY,
            'coordenadaX' => $this->coordenadaX,
            'datos_dasometricos' => $this->datosDasometricos,
            'estado_sanitario' => $this->estadoSanitario,
            'tareas' => $this->tareas,
        ];
    }
}