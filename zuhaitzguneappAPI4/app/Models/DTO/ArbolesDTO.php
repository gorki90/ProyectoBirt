<?php

namespace App\Models\DTO;

class ArbolesDTO
{
    public $codigo;
    public $especie;
    public $nombre_comun;
    public $barrio;
    public $calle;
    public $notas_ubicacion;
    public $coordenadaX;
    public $coordenadaY;

    public $altura;
    public $diametro;
    public $altura_primera_rama;
    public $morfologia;
    public $tipo_alcorque;
    public $disposicion;

    public $estado;
    public $enfermedades;
    public $plagas;
    public $afecciones_abioticas;
    public $riesgos;
    public $notas;

    public $tasks;

    public function __construct($data)
    {   
        $this->codigo = $data['locationData']['codigo'];
        $this->especie = $data['locationData']['especie'];
        $this->nombre_comun = $data['locationData']['nombre_comun'];
        $this->barrio = $data['locationData']['barrio'];
        $this->calle = $data['locationData']['calle'];
        $this->notas_ubicacion = $data['locationData']['notas_ubicacion'];
        $this->coordenadaX = $data['locationData']['coordenadaX'];
        $this->coordenadaY = $data['locationData']['coordenadaY'];

        $this->diametro = $data['dasometricData']['diametro'];
        $this->altura = $data['dasometricData']['altura'];
        $this->altura_primera_rama = $data['dasometricData']['altura_primera_rama'];
        $this->morfologia = $data['dasometricData']['morfologia'];
        $this->tipo_alcorque = $data['dasometricData']['tipo_alcorque'];
        $this->disposicion = $data['dasometricData']['disposicion'];

        $this->estado = $data['healthStatus']['estado'];
        $this->plagas = $data['healthStatus']['plagas'];
        $this->enfermedades = $data['healthStatus']['enfermedades'];
        $this->riesgos = $data['healthStatus']['riesgos'];
        $this->afecciones_abioticas = $data['healthStatus']['afecciones_abioticas'];
        $this->notas = $data['healthStatus']['notas'];

        $this->tasks = $data['tasks'] ?? [];
    }
    public function toArray()
    {
        return [
            'codigo' => $this->codigo,
            'especie' => $this->especie,
            'nombre_comun' => $this->nombre_comun,
            'barrio' => $this->barrio,
            'calle' => $this->calle,
            'notas_ubicacion' => $this->notas_ubicacion,
            'coordenadaX' => $this->coordenadaX,
            'coordenadaY' => $this->coordenadaY,
            'altura' => $this->altura,
            'diametro' => $this->diametro,
            'altura_primera_rama' => $this->altura_primera_rama,
            'morfologia' => $this->morfologia,
            'tipo_alcorque' => $this->tipo_alcorque,
            'disposicion' => $this->disposicion,
            'estado' => $this->estado,
            'plagas' => $this->plagas,
            'enfermedades' => $this->enfermedades,
            'riesgos' => $this->riesgos,
            'afecciones_abioticas' => $this->afecciones_abioticas,
            'notas' => $this->notas,
            'tasks' => $this->tasks,
        ];
    }
}