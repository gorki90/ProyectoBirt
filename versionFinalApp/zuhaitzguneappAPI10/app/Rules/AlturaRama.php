<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
// regla para que al obligar a rellenar el campo tipo_accion si se crea una tarea y se rellena cualquier otro campo
class AlturaRama implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Obtener todas las tareas
        $altura = request()->input('dasometricData.altura'); // Si no existen tareas, devuelve un array vacío


                if ($value !== null && $value >  $altura ) {
                    $fail("La primera rama nunca puede ser más alta que la altura del arbol");
                }
    }
}
    
