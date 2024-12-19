<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    public function getImageAsBase64(Request $request)
    {
        $path = $request->query('path'); // Ruta de la imagen recibida desde Angular

        // Verifica si el archivo existe
        if (file_exists($path)) {
            $imageData = base64_encode(file_get_contents($path)); // Convierte la imagen a Base64
            return response()->json($imageData);
        } else {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
    }
    public function store(Request $request)
    {
        // Validar que el archivo sea una imagen
        $request->validate([
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Verificar si el archivo 'foto' está presente
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $originalName = $file->getClientOriginalName(); // Obtener el nombre original del archivo
            $path = 'fotos_arboles'; // Carpeta de destino
            // Crear un nombre único con fecha y hora
            $timestamp = now()->format('Ymd_His'); // Ejemplo: 20241203_154530
            // Guardar el archivo con su nombre original
            $fotoPath = $file->storeAs($path, $timestamp.'_'. $originalName, 'public');
        
            // Retornar la ruta del archivo guardado
            return response()->json([
                'message' => 'Foto subida correctamente',
                'filePath' => $fotoPath,
            ], 200);
        } else {
            return response()->json([ 'message' => 'Foto no proporcionada, pero proceso completado con éxito'], 200);
        }
    }
    public function deleteFoto($photoName)
    {   // usar disco public. Para usarlo se ha tenido que hacer enlace simbólico entre storage/app/public y public/storage
        // para que los archivos presentes en storage/app/public sean publicos mediante el comando: php artisan storage:link
        if (Storage::disk('public')->exists('fotos_arboles/' . $photoName)) {
            Storage::disk('public')->delete('fotos_arboles/' . $photoName);
            return response()->json(['message' => 'Foto eliminada correctamente.'], 200);
        }
        return response()->json(['message' => 'Foto no encontrada.'], 404);
    }
    public function getFoto($filename)
    {
        $path = storage_path("app/public/fotos_arboles/{$filename}");

        if (!File::exists($path)) {
            return response()->json(['error' => 'Archivo no encontrado'], 404);
        }

        return response()->file($path);
    }
}
