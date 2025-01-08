<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatosDasometricos extends Model
{

    protected $table = 'datos_dasometricos'; // Nombre de la tabla
    public $timestamps = false;
    protected $fillable = [
        'arbol_id',
        'altura', 
        'diametro', 
        'altura_primera_rama', 
        'morfologia', 
        'tipo_alcorque', 
        'disposicion',
    ];

    // Relación inversa con IdentificacionLocalizacion (uno a uno)
    public function identificacionLocalizacion()
    {
        return $this->belongsTo(IdentificacionLocalizacion::class, 'arbol_id');
    }
}
