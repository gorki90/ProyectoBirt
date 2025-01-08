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
    {
        // Obtener todas las tareas desde la solicitud
        $tasks = request()->input('tasks', []); // Si no existen tareas, devuelve un array vacío

        // Si no hay tareas definidas, no se realiza ninguna validación
        if (!is_array($tasks) || count($tasks) === 0) {
            return;
        }

        // Iterar sobre las tareas
        foreach ($tasks as $task) {
            // Asegurarse de que la tarea tenga la fecha de comienzo y la fecha de límite
            $fecha_comienzo = $task['fecha_comienzo'] ?? null;
            $fecha_limite = $task['fecha_limite'] ?? null;

            // Si ambos campos están presentes, realizar la validación
            if ($fecha_comienzo !== null && $fecha_limite !== null) {
                // Convertir las fechas en instancias de Carbon
                $fechaComienzo = Carbon::parse($fecha_comienzo);
                $fechaLimite = Carbon::parse($fecha_limite);

                // Comparar la fecha límite con la fecha de comienzo
                if ($fechaLimite < $fechaComienzo) {
                    $fail("La fecha límite ($fechaLimite) no puede ser anterior a la fecha de comienzo ($fechaComienzo).");
                }
            }
        }
    }
        
    
}