<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IdentificacionLocalizacion extends Model
{

    protected $table = 'identificacion_localizacion'; // Especificamos el nombre de la tabla

    protected $primaryKey = 'id'; // Especificamos la clave primaria
    public $timestamps = false;
    protected $fillable = [
        'id',
        'codigo', 
        'especie', 
        'nombre_comun', 
        'barrio', 
        'calle', 
        'notas_ubicacion', 
        'geom',
        'foto',
    ];

  

    // Relación con DatosDasometricos (uno a uno)
    public function datosDasometricos()
    {
        return $this->hasOne(DatosDasometricos::class, 'arbol_id', 'id');
    }

    // Relación con EstadoSanitario (uno a uno)
    public function estadoSanitario()
    {
        return $this->hasOne(EstadoSanitario::class, 'arbol_id', 'id');
    }

    // Relación con Tareas (uno a muchos)
    public function tareas()
    {
        return $this->hasMany(Tarea::class,'arbol_id', 'id');
    }
}
