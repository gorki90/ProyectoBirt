<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{

    protected $table = 'tareas'; // Nombre de la tabla
    public $timestamps = false;
    protected $fillable = [
        'arbol_id',
        'tipo_accion', 
        'descripcion_accion', 
        'prioridad', 
        'fecha_comienzo', 
        'fecha_limite', 
        'estado_accion',
    ];

    // Relación inversa con IdentificacionLocalizacion (muchos a uno)
    public function identificacionLocalizacion()
    {
        return $this->belongsTo(IdentificacionLocalizacion::class, 'arbol_id');
    }
}
