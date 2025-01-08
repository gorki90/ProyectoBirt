<?php

namespace App\Http\Requests;

use App\Rules\AlturaRama;
use App\Rules\FechaLimite;
use Illuminate\Foundation\Http\FormRequest;
use App\Rules\TipoAccion;
use phpDocumentor\Reflection\Types\Nullable;
use Illuminate\Validation\Rule;

class ValidacionUpdate extends FormRequest
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
            'locationData.codigo'=> ['required', 'string', 'max:10','regex:/^[A-Za-z0-9]+$/',Rule::unique('identificacion_localizacion', 'codigo')->ignore($this->route('id'))], // Reemplaza 'id' con el nombre de la ruta que contiene el ID del registro.
            'locationData.especie'=>['nullable','string', 'max:100'], 
            'locationData.nombre_comun'=>['nullable','string', 'max:100'], 
            'locationData.barrio'=>['nullable', 'string','max:150'], 
            'locationData.calle'=>['nullable','string', 'max:200'],  
            'locationData.notas_ubicacion'=>['nullable','string', 'max:500'],  
            'locationData.coordendaX'=>['required_if:locationData.codigo,!empty','numeric'], 
            'locationData.coordendaY'=>['required_if:locationData.codigo,!empty','numeric'], 
            'locationData.foto'=>['nullable','string'],
            // Datos dasometricos
            'dasometricData.arbol_id' => ['required_if:locationData.codigo,!empty', 'integer','min:1','exists:identificacion_localizacion,id'],
            'dasometricData.diametro' => ['nullable','numeric', 'min:0.01'], 
            'dasometricData.altura' => ['nullable','numeric','min:0.01'], 
            'dasometricData.altura_primera_rama' => ['nullable','numeric', 'min:0.01', new AlturaRama], 
            'dasometricData.morfologia' => ['nullable','string', 'max:100'], 
            'dasometricData.tipo_alcorque' => ['nullable','string', 'max:100'], 
            'dasometricData.disposicion' => ['nullable','string', 'max:100'], 
            // Estado sanitario
            'healthStatus.arbol_id' => ['required_if:locationData.codigo,!empty', 'integer','min:1','exists:identificacion_localizacion,id'],
            'healthStatus.estado' => ['nullable','string', 'max:100'], 
            'healthStatus.enfermedades' => ['nullable','string', 'max:200'], 
            'healthStatus.plagas' => ['nullable','string', 'max:200'], 
            'healthStatus.afecciones_abioticas' =>['nullable','string', 'max:200'], 
            'healthStatus.riesgos' =>['nullable','string', 'max:300'], 
            'healthStatus.notas' =>['nullable','string', 'max:500'], 
            //tareas
            //'tasks.*.arbol_id' => ['required_if:locationData.codigo,!empty', 'integer','min:1','exists:identificacion_localizacion,id'],
            'tasks.*.tipo_accion' => [new TipoAccion],
            'tasks.*.descripcion_accion'=>['nullable','string', 'max:500'], 
            'tasks.*.prioridad' => ['nullable', 'in:baja,normal,alta,urgente,""'],
            'tasks.*.estado' => ['nullable', 'in:iniciada,no_iniciada,programada,por_determinar,finalizada,""'],
            'tasks.*.fecha_comienzo' => ['nullable', 'date'],
            'tasks.*.fecha_limite' => ['nullable', 'date', new FechaLimite],
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
            // Identificacion localizacion
            'locationData.codigo.required' => 'El código es obligatorio.',
            'locationData.codigo.unique' => 'El código ingresado ya existe en el sistema.',
            'locationData.codigo.max' => 'El código no puede tener más de 10 caracteres.',
            'locationData.codigo.regex' => 'El código solo puede contener letras y números.',
            'locationData.especie.string' => 'El campo especie debe ser una cadena de texto.',
            'locationData.especie.max' => 'El campo especie no debe superar los 100 caracteres.',
            'locationData.nombre_comun.max' => 'El campo nombre común no debe superar los 100 caracteres.',
            'locationData.barrio.max' => 'El campo barrio no debe superar los 150 caracteres.',
            'locationData.calle.max' => 'El campo calle no debe superar los 200 caracteres.',
            'locationData.notas_ubicacion.max' => 'El campo notas de ubicación no debe superar los 500 caracteres.',
            'locationData.coordenadaX.required_if' => 'La coordenada X es obligatoria.',
            'locationData.coordenadaY.required_if' => 'La coordenada Y es obligatoria.',
            'locationData.coordenadaX.numeric' => 'La coordenada X debe ser un valor numérico.',
            'locationData.coordenadaY.numeric' => 'La coordenada Y debe ser un valor numérico.',
            'locationData.foto.string' => 'El campo foto debe ser una cadena de texto.',
            // Datos dasometricos
            'dasometricData.arbol_id.required_if' => 'El campo arbol_id es obligatorio.',
            'dasometricData.arbol_id.integer' => 'El campo arbol_id debe ser un número entero.',
            'dasometricData.arbol_id.min' => 'El campo arbol_id debe ser un número entero positivo.',
            'dasometricData.arbol_id.exists' => 'El arbol_id no existe en la tabla de identificacion_localizacion.',
            'dasometricData.diametro.numeric' => 'El diámetro debe ser un número válido.',
            'dasometricData.diametro.min' => 'El diámetro debe ser un valor positivo mayor a 0.',
            'dasometricData.altura.numeric' => 'La altura debe ser un número válido.',
            'dasometricData.altura.min' => 'La altura debe ser un valor positivo mayor a 0.',
            'dasometricData.altura_primera_rama.numeric' => 'La altura de la primera rama debe ser un número válido.',
            'dasometricData.altura_primera_rama.min' => 'La altura de la primera rama debe ser un valor positivo mayor a 0.',
            'dasometricData.morfologia.max' => 'La morfología no puede exceder los 100 caracteres.',
            'dasometricData.tipo_alcorque.max' => 'El tipo de alcorque no puede exceder los 100 caracteres.',
            'dasometricData.disposicion.max' => 'La disposición no puede exceder los 100 caracteres.',
            // estado sanitario
            'healthStatus.arbol_id.required_if' => 'El campo árbol es obligatorio.',
            'healthStatus.arbol_id.integer' => 'El campo árbol debe ser un número entero.',
            'healthStatus.arbol_id.min' => 'El campo árbol debe ser al menos 1.',
            'healthStatus.arbol_id.exists' => 'El árbol especificado no existe.',
            'healthStatus.estado.max' => 'El campo estado no puede tener más de 100 caracteres.',
            'healthStatus.enfermedades.max' => 'El campo enfermedades no puede tener más de 200 caracteres.',
            'healthStatus.plagas.max' => 'El campo plagas no puede tener más de 200 caracteres.',
            'healthStatus.afecciones_abioticas.max' => 'El campo afecciones abióticas no puede tener más de 200 caracteres.',
            'healthStatus.riesgos.max' => 'El campo riesgos no puede tener más de 300 caracteres.',
            'healthStatus.notas.max' => 'El campo notas no puede tener más de 500 caracteres.',
            //tareas
            // 'tasks.*.arbol_id.integer' => 'El campo árbol debe ser un número entero.',
            // 'tasks.*.arbol_id.min' => 'El campo árbol debe ser al menos 1.',
            // 'tasks.*.arbol_id.exists' => 'El árbol especificado no existe.',
            // 'tasks.*.tipo_accion.required_if' => 'El campo tipo de acción es obligatorio cuando hay una tarea.',
            // 'tasks.*.tipo_accion.max' => 'El campo tipo de acción no puede exceder los 255 caracteres.',
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
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $coordenadaX = $this->input('locationData.coordenadaX');
            $coordenadaY = $this->input('locationData.coordenadaY');
            
            // Validar que las coordenadas estén dentro del rango válido de la proyección Mercator
            $mercatorMin = -20037508.34;
            $mercatorMax = 20037508.34;

            if ($coordenadaX < $mercatorMin || $coordenadaX > $mercatorMax) {
                $validator->errors()->add('locationData.coordenadaX', 'La coordenada X debe estar entre ' . $mercatorMin . ' y ' . $mercatorMax . '.');
            }

            if ($coordenadaY < $mercatorMin || $coordenadaY > $mercatorMax) {
                $validator->errors()->add('locationData.coordenadaY', 'La coordenada Y debe estar entre ' . $mercatorMin . ' y ' . $mercatorMax . '.');
            }

            // Validación personalizada: por ejemplo, chequear si las coordenadas están en una zona válida
            if ($coordenadaX && $coordenadaY && !$this->coordenadasSonValidas($coordenadaX, $coordenadaY)) {
                $validator->errors()->add('locationData.coordenadaX', 'Las coordenadas no pertenecen al Pais Vasco.');
            }
        });
    }

    // emtodo para verificar si las coordenadas están dentro del Pais Vasco
    private function coordenadasSonValidas($coordenadaX, $coordenadaY)
    {
        
        // Definir los límites de las coordenadas Mercator para el País Vasco
        $mercatorXMin = -362715.66;
        $mercatorXMax = -207796.43;
        $mercatorYMin = 4858779.17;
        $mercatorYMax = 5381467.30;

    // Validar si las coordenadas están dentro de los límites
        if ($coordenadaX >= $mercatorXMin && $coordenadaX <= $mercatorXMax && 
            $coordenadaY >= $mercatorYMin && $coordenadaY <= $mercatorYMax) {
            return true; // Las coordenadas son válidas
        }
        return false; // O devuelve false si no es válida
    }
}
