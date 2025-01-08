<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoSanitario extends Model
{

    protected $table = 'estado_sanitario'; // Nombre de la tabla
    public $timestamps = false;
    protected $fillable = [
        'arbol_id',
        'estado', 
        'enfermedades', 
        'plagas', 
        'afecciones_abioticas', 
        'riesgos', 
        'notas',
    ];

    // Relación inversa con IdentificacionLocalizacion (uno a uno)
    public function identificacionLocalizacion()
    {
        return $this->belongsTo(IdentificacionLocalizacion::class, 'arbol_id');
    }
}
