<?php

namespace App\Http\Controllers;

use App\DTO\ArbolDTO;
use App\Http\Requests\ValidacionCreate;
use App\Http\Requests\ValidacionUpdate;
use Illuminate\Http\Request;
use App\Models\IdentificacionLocalizacion;
use App\Models\DTO\ArbolrestDTO;
use App\Models\DatosDasometricos;
use App\Models\EstadoSanitario;
use App\Models\DTO\ArbolesDTO;
use App\Models\DTO\TareasDTO;
use App\Models\DTO\TareaDTO;
use App\Models\Tarea;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class ArbolController extends Controller
{
    // metodo para obtener todos los arboles
    public function getAll ()
    {
        // Obtener todos los árboles con sus relaciones
        $arboles = IdentificacionLocalizacion::with(['datosDasometricos', 'estadoSanitario', 'tareas'])
        ->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->get();
      
        if ($arboles->isEmpty()) {
            return response()->json(['message' => 'Lista de árboles no encontrada'], 404);
        }
        // Preparar los datos para el DTO
        $arbolListaDTO = [];
        foreach ($arboles as $arbol) {
            $data =  [
                'locationData' => [
                    'codigo' => $arbol->codigo,
                    'especie' => $arbol->especie,
                    'nombre_comun' => $arbol->nombre_comun,
                    'barrio' => $arbol->barrio,
                    'calle' => $arbol->calle,
                    'notas_ubicacion' => $arbol->notas_ubicacion,
                    'coordenadaX' => $arbol->coordenadax,
                    'coordenadaY' => $arbol->coordenaday,
                    'foto' => $arbol->foto ? url('storage/' . $arbol->foto) : null, // Ruta completa de la foto
                ],
                'dasometricData' => [
                    'diametro' => $arbol->datosDasometricos->diametro ?? null,
                    'altura' => $arbol->datosDasometricos->altura ?? null,
                    'altura_primera_rama' => $arbol->datosDasometricos->altura_primara_rama ?? null,
                    'morfologia' => $arbol->datosDasometricos->morfologia ?? null,
                    'tipo_alcorque' => $arbol->datosDasometricos->tipo_alcorque ?? null,
                    'disposicion' => $arbol->datosDasometricos->disposicion ?? null,
                ],
                'healthStatus' => [
                    'estado' => $arbol->estadoSanitario->estado ?? null, 
                    'enfermedades' => $arbol->estadoSanitario->enfermedades ?? null,
                    'plagas' => $arbol->estadoSanitario->plagas ?? null, 
                    'afecciones_abioticas' => $arbol->estadoSanitario->afecciones_abioticas ?? null,  
                    'riesgos' => $arbol->estadoSanitario->riesgos ?? null,  
                    'notas' => $arbol->estadoSanitario->notas ?? null,
                ],
                'tasks' => $arbol->tareas->map(function ($tarea) {
                    return [
                        'tipo_accion' => $tarea->tipo_accion,
                        'descripcion_accion' => $tarea->descripcion_accion,
                        'prioridad' => $tarea->prioridad,
                        'fecha_comienzo' => $tarea->fecha_comienzo,
                        'fecha_limite' => $tarea->fecha_limite,
                        'estado_accion' => $tarea->estado_accion,
                    ];
                }),
                
            ];
           
            $arbolListaDTO[] = new ArbolesDTO($data); 
        }
        $arbolDTOjson = collect($arbolListaDTO)->toJson();
        // Retornar los árboles con todas las relaciones en formato JSON
        return response()->json($arbolDTOjson);
    }
    // metodo para obtener todos los arboles con clave primaria
    public function index()
    {
        // Obtener todos los árboles con sus relaciones
        $arboles = IdentificacionLocalizacion::with(['datosDasometricos', 'estadoSanitario', 'tareas'])
        ->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->get();
        
        // Mapear cada árbol a un ArbolDTO
        $arbolesDTO = $arboles->map(function($arbol) {
            return new ArbolrestDTO($arbol);
        });

        // Retornar los árboles como un array de DTOs
        return response()->json($arbolesDTO->toArray());
    }
    // metodo para obtener un arbol por su id
    public function getIdArbol($id)
    {
        // Obtener el árbol con las relaciones
        $arbol = IdentificacionLocalizacion::with(['datosDasometricos', 'estadoSanitario', 'tareas'])
        //->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->where('id', $id)
        ->first();
        
        // Verificar si el árbol existe
        if (!$arbol) {
            return response()->json(['message' => 'Árbol no encontrado'], 404);
        }
        
        // Preparar los datos para el DTO
        $data =  [
            'locationData' => [
                'codigo' => $arbol->codigo,
                'especie' => $arbol->especie,
                'nombre_comun' => $arbol->nombre_comun,
                'barrio' => $arbol->barrio,
                'calle' => $arbol->calle,
                'notas_ubicacion' => $arbol->notas_ubicacion,
                'coordenadaX' => $arbol->coordenadax,
                'coordenadaY' => $arbol->coordenaday,
                'foto' => $arbol->foto ? basename ($arbol->foto) : null, // Ruta completa de la foto
            ],
            'dasometricData' => [
                'diametro' => $arbol->datosDasometricos->diametro ?? null,
                'altura' => $arbol->datosDasometricos->altura ?? null,
                'altura_primera_rama' => $arbol->datosDasometricos->altura_primera_rama ?? null,
                'morfologia' => $arbol->datosDasometricos->morfologia ?? null,
                'tipo_alcorque' => $arbol->datosDasometricos->tipo_alcorque ?? null,
                'disposicion' => $arbol->datosDasometricos->disposicion ?? null,
            ],
            'healthStatus' => [
                'estado' => $arbol->estadoSanitario->estado ?? null, 
                'enfermedades' => $arbol->estadoSanitario->enfermedades ?? null,
                'plagas' => $arbol->estadoSanitario->plagas ?? null, 
                'afecciones_abioticas' => $arbol->estadoSanitario->afecciones_abioticas ?? null,  
                'riesgos' => $arbol->estadoSanitario->riesgos ?? null,  
                'notas' => $arbol->estadoSanitario->notas ?? null,
            ],
            'tasks' => $arbol->tareas->map(function ($tarea) {
                return [
                    'tipo_accion' => $tarea->tipo_accion,
                    'descripcion_accion' => $tarea->descripcion_accion,
                    'prioridad' => $tarea->prioridad,
                    'fecha_comienzo' => $tarea->fecha_comienzo,
                    'fecha_limite' => $tarea->fecha_limite,
                    'estado_accion' => $tarea->estado_accion,
                ];
            }),
            
        ];

        // Crear el DTO y devolverlo
        $arbolDTO = new ArbolesDTO($data);
        
        return response()->json($arbolDTO);
    }
    // metodo para crear un arbol
    public function createArbol(ValidacionCreate $request)
    {
    
            // Inicializar el DTO con los datos recibidos del formulario
            $arbolDTO = new ArbolesDTO($request->all());
            
            $x = $arbolDTO->coordenadaX;
            $y = $arbolDTO->coordenadaY;
            
            // Inserto el árbol en la tabla  y obtiengo el ID autoincremental
            $id = DB::table('identificacion_localizacion')->insertGetId([
                'codigo' => $arbolDTO->codigo,
                'geom' => DB::raw("ST_SetSRID(ST_MakePoint($x, $y), 3857)"),
                'especie' => $arbolDTO->especie,
                'nombre_comun' => $arbolDTO->nombre_comun,
                'barrio' => $arbolDTO->barrio,
                'calle' => $arbolDTO->calle,
                'notas_ubicacion' => $arbolDTO->notas_ubicacion,
                'foto' => $arbolDTO->foto, // Guardar la ruta de la foto
            ]);
            DatosDasometricos::create([
                'arbol_id' => $id,
                'diametro' => $arbolDTO->diametro,
                'altura' => $arbolDTO->altura,
                'altura_primera_rama' => $arbolDTO->altura_primera_rama,
                'morfologia' => $arbolDTO->morfologia,
                'tipo_alcorque' => $arbolDTO->tipo_alcorque,
                'disposicion' => $arbolDTO->disposicion,
            ]);
            // Guardar estado sanitario en `estado_sanitario`
            EstadoSanitario::create([
                'arbol_id' => $id,
                'plagas' => $arbolDTO->plagas,
                'enfermedades' => $arbolDTO->enfermedades,
                'riesgos' => $arbolDTO->riesgos,
                'estado' => $arbolDTO->estado, 
                'afecciones_abioticas' => $arbolDTO->afecciones_abioticas,  
                'notas' => $arbolDTO->notas,
            ]);

            // Guardar cada tarea en `tareas`
            foreach ($arbolDTO->tasks as $taskData) {
                // si no hay tarea que no guarde nada
                if (!empty($taskData['tipo_accion'])) {
                    Tarea::create([
                        'arbol_id' => $id,
                        'tipo_accion' => $taskData['tipo_accion'],
                        'descripcion_accion' => $taskData['descripcion_accion'],
                        'prioridad' => $taskData['prioridad'],
                        'estado_accion' => $taskData['estado_accion'],
                        'fecha_comienzo' => $taskData['fecha_comienzo'],
                        'fecha_limite' => $taskData['fecha_limite']
                    ]);
                }
            }

            return response()->json(['message' => 'Árbol creado correctamente']);


    }
    // metodo para actualizar un arbol
    public function updateArbol(ValidacionUpdate $request, $id)
    {
        // Buscar el árbol por su ID, si no existe lanzamos una excepción
        $arbol = IdentificacionLocalizacion::findOrFail($id);
    
        // Inicializar el DTO con los datos recibidos del formulario
        $arbolDTO = new ArbolesDTO($request->all());
        
        // Obtener las coordenadas X y Y
        $x = $arbolDTO->coordenadaX;
        $y = $arbolDTO->coordenadaY;
    
        // Crear la geometría en formato WKT para la proyección EPSG:3857
        //$geom = DB::raw("ST_Transform(ST_SetSRID(ST_MakePoint($lat, $ln  

        // Actualizar los datos del árbol en la tabla `identificacion_localizacion`
        $arbol->update([
            'codigo' => $arbolDTO->codigo,
            'geom' => DB::raw("ST_SetSRID(ST_MakePoint($x, $y), 3857)"),
            'especie' => $arbolDTO->especie,
            'nombre_comun' => $arbolDTO->nombre_comun,
            'barrio' => $arbolDTO->barrio,
            'calle' => $arbolDTO->calle,
            'notas_ubicacion' => $arbolDTO->notas_ubicacion,
            'foto' => $arbolDTO->foto,  // Actualizar con la foto nueva o mantener la actual
        ]);
        
        // Si existe un registro de datos dasometricos, actualizarlo; si no, crear uno nuevo
        $datosDasometricos = DatosDasometricos::where('arbol_id', $id)->first();
        if ($datosDasometricos) {
            $datosDasometricos->update([
                'altura' => $arbolDTO->altura,
                'diametro' => $arbolDTO->diametro,
                'altura_primera_rama' => $arbolDTO->altura_primera_rama,
                'morfologia' => $arbolDTO->morfologia, 
                'tipo_alcorque' => $arbolDTO->tipo_alcorque,  
                'disposicion' => $arbolDTO->disposicion,
            ]);
        } else {
            DatosDasometricos::create([
                'arbol_id' => $id,
                'altura' => $arbolDTO->altura,
                'diametro' => $arbolDTO->diametro,
                'altura_primera_rama' => $arbolDTO->altura_primera_rama,
                'morfologia' => $arbolDTO->morfologia, 
                'tipo_alcorque' => $arbolDTO->tipo_alcorque,  
                'disposicion' => $arbolDTO->disposicion,
            ]);
        }
        // Si existe un registro de estado sanitario, actualizarlo; si no, crear uno nuevo
        $estadoSanitario = EstadoSanitario::where('arbol_id', $id)->first();
        if ($estadoSanitario) {
            $estadoSanitario->update([
                'plagas' => $arbolDTO->plagas,
                'enfermedades' => $arbolDTO->enfermedades,
                'riesgos' => $arbolDTO->riesgos,
                'estado' => $arbolDTO->estado, 
                'afecciones_abioticas' => $arbolDTO->afecciones_abioticas,  
                'notas' => $arbolDTO->notas,
            ]);
        } else {
            EstadoSanitario::create([
                'arbol_id' => $id,
                'plagas' => $arbolDTO->plagas,
                'enfermedades' => $arbolDTO->enfermedades,
                'riesgos' => $arbolDTO->riesgos,
                'estado' => $arbolDTO->estado, 
                'afecciones_abioticas' => $arbolDTO->afecciones_abioticas,  
                'notas' => $arbolDTO->notas,
            ]);
        }
    
        // Eliminar las tareas existentes y volver a crearlas (si es necesario)
        Tarea::where('arbol_id', $id)->delete();
        foreach ($arbolDTO->tasks as $taskData) {
            // si no hay tarea, no se guarda nada
            if (!empty($taskData['tipo_accion'])) {
                Tarea::create([
                    'arbol_id' => $id,
                    'tipo_accion' => $taskData['tipo_accion'],
                    'descripcion_accion' => $taskData['descripcion_accion'],
                    'prioridad' => $taskData['prioridad'],
                    'estado_accion' => $taskData['estado_accion'],
                    'fecha_comienzo' => $taskData['fecha_comienzo'],
                    'fecha_limite' => $taskData['fecha_limite']
                ]);
            }
        }
    
        return response()->json(['message' => 'Árbol actualizado correctamente', 'arbol' => $arbol]);
    }
    // metodo para elimnar un arbol
    public function deleteArbol($id)
    {
        // Buscar el árbol por ID
        $arbol = IdentificacionLocalizacion::find($id);
    
        // Verificar si el árbol existe
        if (!$arbol) {
            return response()->json(['message' => 'Árbol no encontrado'], 404);
        }
    
        // Eliminar el árbol (las relaciones se eliminarán en cascada)
        $arbol->delete();
    
        return response()->json(['message' => 'Árbol eliminado exitosamente'], 200);
    }
    // metodo para obtener los barrios de la base de datos
    public function getArbolesBarrios()
    {
        // Suponiendo que tienes una columna 'barrio' en tu base de datos
        $barrios = IdentificacionLocalizacion::distinct()->pluck('barrio'); // Asegúrate de usar el modelo correcto
        return response()->json($barrios);
    }
}