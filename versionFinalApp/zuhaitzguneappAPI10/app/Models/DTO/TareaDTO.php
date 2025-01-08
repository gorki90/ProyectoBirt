<?php

namespace App\Models\DTO;

class TareaDTO {
public $tipo_accion;
public $descripcion_accion;
public $prioridad;
public $fecha_comienzo;
public $fecha_limite;
public $estado_accion;


public function __construct($data)
{   
            // Si es un objeto, conviértelo a un array
    if (is_object($data)) {
        $data = json_decode(json_encode($data), true);
    }
    $this->tipo_accion = $data['tipo_accion'];
    $this->descripcion_accion = $data['descripcion_accion'];
    $this->prioridad = $data['prioridad'];
    $this->fecha_comienzo = $data['fecha_comienzo'];
    $this->fecha_limite = $data['fecha_limite'];
    $this->estado_accion = $data['estado_accion'];
}

}
