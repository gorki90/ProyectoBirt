<?php

namespace App\Models\DTO;

class TareasDTO
{
    public $id;
    public $codigo;
    public $especie;
    public $nombre_comun;
    public $barrio;
    public $calle;
    public $notas_ubicacion;
    public $coordenadaX;
    public $coordenadaY;
    public $tasks;

    public function __construct($data)
    {   
                // Si es un objeto, conviértelo a un array
        if (is_object($data)) {
            $data = json_decode(json_encode($data), true);
        }
        $this->id = $data['locationData']['id'];
        $this->codigo = $data['locationData']['codigo'];
        $this->especie = $data['locationData']['especie'];
        $this->nombre_comun = $data['locationData']['nombre_comun'];
        $this->barrio = $data['locationData']['barrio'];
        $this->calle = $data['locationData']['calle'];
        $this->notas_ubicacion = $data['locationData']['notas_ubicacion'];
        $this->coordenadaX = $data['locationData']['coordenadaX'];
        $this->coordenadaY = $data['locationData']['coordenadaY'];
        $this->tasks = $data['tasks'] ?? [];
    }
}