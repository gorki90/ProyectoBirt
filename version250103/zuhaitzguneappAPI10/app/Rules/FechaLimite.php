<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Carbon\Carbon;
// regla para que al insertar o actualizar valores en el campo fecha limite
class FechaLimite implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {// Obtener todas las tareas
        $tasks = request()->input('tasks', []); // Si no existen tareas, devuelve un array vacío

        // Si no hay tareas definidas, no se realiza ninguna validación
        if (!is_array($tasks) || count($tasks) === 0) {
            return;
        }

        // Iterar sobre cada tarea para verificar los valores
        foreach ($tasks as $task) {

            $fecha_comienzo = $task['fecha_comienzo'] ?? null;
  


            // Si se define cualquier campo de la tarea, validar que `tipo_accion` esté presente
            if (

                $fecha_comienzo !== null 
      
            ) {
                $fechaComienzo = Carbon::parse($fecha_comienzo);
                $fechaLimite = Carbon::parse($value);
                if ($fechaLimite < $fechaComienzo) {
                    
                    $fail("La fecha limite no puede ser anterior a la fecha de comienzo.");
                }
            }
        }
    }
        
    
}