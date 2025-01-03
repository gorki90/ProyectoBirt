<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidacionTareaUpdate;
use Illuminate\Http\Request;
use App\Models\IdentificacionLocalizacion;
use App\Models\DTO\TareasDTO;
use App\Models\DTO\TareaDTO;
use App\Models\Tarea;


class TareasController extends Controller
{
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
                    'id'=> $arbol->id ?? null,
                    'codigo' => $arbol->codigo ?? null,
                    'especie' => $arbol->especie ?? null,
                    'nombre_comun' => $arbol->nombre_comun ?? null,
                    'barrio' => $arbol->barrio ?? null,
                    'calle' => $arbol->calle ?? null,
                    'notas_ubicacion' => $arbol->notas_ubicacion ?? null,
                    'coordenadaX' => $arbol->coordenadax ?? null,
                    'coordenadaY' => $arbol->coordenaday ?? null,
                    'foto' => $arbol->foto ?? null,
                ],
                'tasks' => $arbol->tareas->toArray() // Convertir las tareas a un arreglo
            ]);
    });
        return response()->json($tareasDTO);

    }
    public function updateTarea(ValidacionTareaUpdate $request, $tareaId) {
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
    public function getTareaFiltro($campo, $valor, Request $request) 
    {
        $barrio = $request->query('barrio'); // Obtiene el parámetro "barrio" si está presente
        $calle = $request->query('calle');   // Obtiene el parámetro "calle" si está presente
        $codigo = $request->query('codigo'); // Obtiene el parámetro "codigo" si está presente
            // Verifica si el filtro es una fecha
        $isDateFilter = in_array($campo, ['fecha_limite', 'fecha_comienzo']);
        // Convierte el valor a minúsculas
        $valor = strtolower($valor);

        $resultado = IdentificacionLocalizacion::where(function ($query) use ($barrio, $calle, $codigo) {
            if ($barrio) {
                $query->where('barrio', $barrio);
            }
            if ($calle) {
                $query->where('calle', $calle);
            }
            if ($codigo) {
                $query->where('codigo', $codigo);
            }
        })
        ->whereHas('tareas', function ($query) use ($campo, $valor, $isDateFilter) {
            // Si es un filtro de fecha, no convertir el valor a minúsculas
            if ($isDateFilter) {
                $query->whereDate($campo, '=', $valor)// Comparar las fechas directamente
                ->where(function ($subQuery) {
                    $subQuery->where('estado_accion', '!=', 'finalizada')
                             ->orWhereNull('estado_accion'); // Incluir tareas con estado null
                }); 
            } else {
                $query->whereRaw("LOWER($campo) = ?", [$valor])
                    ->where(function ($subQuery) {
                        $subQuery->where('estado_accion', '!=', 'finalizada')
                                 ->orWhereNull('estado_accion'); // Incluir tareas con estado null
                    });
            }
        })
        ->with(['tareas' => function ($query) use ($campo, $valor, $isDateFilter) {
            // Si es un filtro de fecha, no convertir el valor a minúsculas
            if ($isDateFilter) {
                $query->whereDate($campo, '=', $valor)// Comparar las fechas directamente
                ->where(function ($subQuery) {
                    $subQuery->where('estado_accion', '!=', 'finalizada')
                             ->orWhereNull('estado_accion'); // Incluir tareas con estado null
                });
            } else {
                $query->whereRaw("LOWER($campo) = ?", [$valor])
                    ->where(function ($subQuery) {
                        $subQuery->where('estado_accion', '!=', 'finalizada')
                                 ->orWhereNull('estado_accion'); // Incluir tareas con estado null
                    });
            }
        }])
        ->selectRaw('*, ST_X(geom) AS coordenadax, ST_Y(geom) AS coordenaday')
        ->get();
        
        $tareasDTO = $resultado->map(function ($arbol) {
            return new TareasDTO([
                'locationData' => [
                    'id' => $arbol->id,
                    'codigo' => $arbol->codigo,
                    'especie' => $arbol->especie,
                    'nombre_comun' => $arbol->nombre_comun,
                    'barrio' => $arbol->barrio,
                    'calle' => $arbol->calle,
                    'notas_ubicacion' => $arbol->notas,
                    'coordenadaX' => $arbol->coordenadax,
                    'coordenadaY' => $arbol->coordenaday,
                    'foto' => $arbol->foto
                ],
                'tasks' => $arbol->tareas->toArray(),
            ]);
        });

        return response()->json($tareasDTO); 
    }
}
