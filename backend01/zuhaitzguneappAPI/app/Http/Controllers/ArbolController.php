<?php

namespace App\Http\Controllers;

use App\DTO\ArbolDTO;
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
class ArbolController extends Controller
{
    // obtener todos los arboles con todas sus caracteristicas
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


public function createArbol(Request $request)
{
    try {
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
    }catch (\Exception $e) {
        return response()->json(['error' => 'Error al crear el árbol', 'message' => $e->getMessage()], 500);
    }

}
public function updateArbol(Request $request, $id)
    {
        // Buscar el árbol por su ID, si no existe lanzamos una excepción
        $arbol = IdentificacionLocalizacion::findOrFail($id);
    
        // Inicializar el DTO con los datos recibidos del formulario
        $arbolDTO = new ArbolesDTO($request->all());
        
        // Obtener las coordenadas X y Y
        $x = $arbolDTO->coordenadaX;
        $y = $arbolDTO->coordenadaY;
    
        // Crear la geometría en formato WKT para la proyección EPSG:3857
        //$geom = DB::raw("ST_Transform(ST_SetSRID(ST_MakePoint($lat, $lng), 4326), 3857)");
    
        // Actualizar los datos del árbol en la tabla `identificacion_localizacion`
        $arbol->update([
            'codigo' => $arbolDTO->codigo,
            'geom' => DB::raw("ST_SetSRID(ST_MakePoint($x, $y), 3857)"),
            'especie' => $arbolDTO->especie,
            'nombre_comun' => $arbolDTO->nombre_comun,
            'barrio' => $arbolDTO->barrio,
            'calle' => $arbolDTO->calle,
            'notas_ubicacion' => $arbolDTO->notas_ubicacion 
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

    public function getTareaArbol()
    {
        
        $arbolesConTareasPendientes = IdentificacionLocalizacion::with(['tareas' => function ($query) {
            $query->whereNotNull('tipo_accion') // tipo_accion no debe ser null
                  ->where(function ($query) {
                      $query->where('estado_accion', '!=', 'finalizada') // estado_accion no debe ser finalizada
                            ->orWhereNull('estado_accion'); // o estado_accion es null
                  });
        }])
        ->whereHas('tareas', function ($query) {
            $query->whereNotNull('tipo_accion') // tipo_accion no debe ser null
                  ->where(function ($query) {
                      $query->where('estado_accion', '!=', 'finalizada') // estado_accion no debe ser finalizada
                            ->orWhereNull('estado_accion'); // o estado_accion es null
                  });
        })
        ->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->get();

        // Mapear los resultados directamente a TareasDTO
        $tareasDTO = $arbolesConTareasPendientes->map(function ($arbol) {
            return new TareasDTO([
                'locationData' => [
                    'codigo' => $arbol->codigo ?? null,
                    'especie' => $arbol->especie ?? null,
                    'nombre_comun' => $arbol->nombre_comun ?? null,
                    'barrio' => $arbol->barrio ?? null,
                    'calle' => $arbol->calle ?? null,
                    'notas_ubicacion' => $arbol->notas_ubicacion ?? null,
                    'coordenadaX' => $arbol->coordenadax ?? null,
                    'coordenadaY' => $arbol->coordenaday ?? null,
                ],
                'tasks' => $arbol->tareas->toArray() // Convertir las tareas a un arreglo
            ]);
    });
        return response()->json($tareasDTO);

    }
    public function updateTarea(Request $request, $tareaId) {
        $tarea = Tarea::findOrFail($tareaId);
        
        // Inicializar el DTO con los datos recibidos del formulario
        $tareaDTO = new TareaDTO($request->all());
       
        $tarea->update([
            'tipo_accion' => $tareaDTO->tipo_accion,
            'descripcion_accion' => $tareaDTO->descripcion_accion,
            'prioridad' => $tareaDTO->prioridad,
            'estado_accion' => $tareaDTO->estado_accion,
            'fecha_comienzo' => $tareaDTO->fecha_comienzo,
            'fecha_limite' => $tareaDTO->fecha_limite 

        ]);
        
    }
    public function getTareaId($id)
    {
        // Obtener el árbol con las relaciones
        $tarea = Tarea::findOrFail($id);
       
        // Verificar si el árbol existe
        if (!$tarea) {
            return response()->json(['message' => 'tarea no encontrada'], 404);
        }
        
        // Preparar los datos para el DTO
        $data =  [
                    'tipo_accion' => $tarea->tipo_accion,
                    'descripcion_accion' => $tarea->descripcion_accion,
                    'prioridad' => $tarea->prioridad,
                    'fecha_comienzo' => $tarea->fecha_comienzo,
                    'fecha_limite' => $tarea->fecha_limite,
                    'estado_accion' => $tarea->estado_accion,
                ];
        ;

        // Crear el DTO y devolverlo
        $tareaDTO = new TareaDTO($data);
        
        return response()->json($tareaDTO);
    }
    public function getTareaFiltro($campo, $valor) 
    {
        // Realiza la consulta usando el método where
        $resultado = IdentificacionLocalizacion::whereHas('tareas', function($query) use ($campo, $valor) {
            $query->where($campo, $valor);
        })->with(['tareas' => function($query) use ($campo, $valor) {
            $query->where($campo, $valor);
        }])->get();
        
        $tareasDTO = $resultado->map(function ($arbol) {
            return new TareasDTO([
                'locationData' => [
                    'codigo' => $arbol->codigo,
                    'especie' => $arbol->especie,
                    'nombre_comun' => $arbol->nombre_comun,
                    'barrio' => $arbol->barrio,
                    'calle' => $arbol->calle,
                    'notas_ubicacion' => $arbol->notas,
                    'coordenadaX' => $arbol->coordenadax,
                    'coordenadaY' => $arbol->coordenaday,
                ],
                'tasks' => $arbol->tareas->toArray(),
            ]);
        });
      

            return response()->json($tareasDTO); // O cualquier acción que desees hacer con el resultado

    }
}