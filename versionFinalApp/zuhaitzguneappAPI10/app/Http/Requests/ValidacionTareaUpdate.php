<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\TipoAccion;
use phpDocumentor\Reflection\Types\Nullable;


class ValidacionTareaUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // valido las propiedades de las tablas para que los datos tengan consistencia e integridad
            // las validaciones basadas en rules las hago para retringir los valores de determinadas proiedades
            // en funcion de los valores de otras propiedades

            'tasks.*.tipo_accion' => [new TipoAccion],
            'tasks.*.descripcion_accion'=>['nullable','string', 'max:500'], 
            'tasks.*.prioridad' => ['nullable', 'in:baja,normal,alta,urgente'],
            'tasks.*.estado' => ['nullable', 'in:iniciada,no_iniciada,programada,por_determinar,finalizada'],
            'tasks.*.fecha_comienzo' => ['nullable', 'date','after:today'],
            'tasks.*.fecha_limite' => ['nullable', 'date','after:today'],
        ];
    }
        /**
     * Configura los mensajes de error personalizados.
     *
     * @return array
     */
    public function messages()
    {
        return [

            'tasks.*.descripcion_accion.max' => 'La descripción de la acción no puede tener más de 500 caracteres.',
            'tasks.*.fecha_comienzo.after' => 'La fecha de comienzo debe ser posterior a la fecha actual.',
            'tasks.*.fecha_comienzo.date' => 'La fecha de comienzo debe ser una fecha válida.',
            'tasks.*.fecha_comienzo.nullable' => 'La fecha de comienzo puede ser nula.',
            'tasks.*.fecha_limite.after' => 'La fecha límite debe ser posterior a la fecha actual.',
            'tasks.*.fecha_limite.date' => 'La fecha límite debe ser una fecha válida.',
            'tasks.*.fecha_limite.nullable' => 'La fecha límite puede ser nula.',
            'tasks.*.prioridad.in' => 'La prioridad debe ser uno de los siguientes valores: alta, media, baja, urgente.',
            'tasks.*.prioridad.nullable' => 'La prioridad puede ser nula.',
        ];
    }
}