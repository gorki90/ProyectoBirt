<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
// regla para que al insertar o actualizar valores en el campo prestado
// se cumplan los siguientes criterios: si se actualiza a no entonces 
// los datos relativos al prestamo tienen que ser nulos
class TipoAccion implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Obtener todas las tareas
        $tasks = request()->input('tasks', []); // Si no existen tareas, devuelve un array vacío

        // Si no hay tareas definidas, no se realiza ninguna validación
        if (!is_array($tasks) || count($tasks) === 0) {
            return;
        }

        // Iterar sobre cada tarea para verificar los valores
        foreach ($tasks as $task) {
            $descripcion_accion = $task['descripcion_accion'] ?? null;
            $fecha_comienzo = $task['fecha_comienzo'] ?? null;
            $fecha_limite = $task['fecha_limite'] ?? null;
            $prioridad = $task['prioridad'] ?? null;
            $estado_accion = $task['estado_accion'] ?? null;

            // Si se define cualquier campo de la tarea, validar que `tipo_accion` esté presente
            if (
                $descripcion_accion !== null ||
                $fecha_comienzo !== null ||
                $fecha_limite !== null ||
                $prioridad !== null ||
                $estado_accion !== null
            ) {
                if ($value === null || $value === '') {
                    $fail("Es obligatorio rellenar el campo $attribute si se define una tarea.");
                }
            }
        }
    }
}
