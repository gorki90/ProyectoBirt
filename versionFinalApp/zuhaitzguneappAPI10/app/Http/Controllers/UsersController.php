<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UsersController extends Controller
{
    // metodo para obtener todos los usuarios
    public function getAllUsers()
    {

        $users=User::get();

        return response()->json($users);

    }
    // metodo para obtener un usuario por su id
    public function getUserById($id)
    {
        $user=User::find($id);

        if(!$user){
            return response()->json([
                'message' => 'El usuario no existe',
            ], 404);
        }
        return response()->json($user);
    }
    // metodo para crear un usuario
    public function createUser(Request $request)
    {

        $validar=$request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:8',     
            'username'=>'required|string|unique:users,username', 
            'foto'=>'nullable|file|mimes:jpg,jpeg,png|max:2048',  
        ]);

        $user=User::create([
            'name'=>$validar['name'],
            'email'=>$validar['email'],
            'password'=>bcrypt($validar['password']),   
            'username'=>$validar['username'],  
            'foto'=>$validar['foto'] ?? null,
        ]);

        return response()->json([
            'message'=>'Usuario creado correctamente',
            'user'=>$user
        ],201);
    }
    // metodo para actualizar un usuario
    public function updateUser(Request $request, $id)
    {
    
        $validar = $request->validate([
            'name' => 'nullable|string|max:255', 
            'username'=>'nullable|string|unique:users,username',
            'email' => 'nullable|email|unique:users,email,' . $id, 
            'password' => 'nullable|string|min:8|confirmed',
            'current_password' => 'required_if:password,!=,null|string|min:8',
            'foto'=>'nullable|string|min:10',
        ]);

        
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El usuario no existe',
            ], 404);
        }

        
        if (isset($validar['password']) && !Hash::check($validar['current_password'], $user->password)) {
            return response()->json([
                'message' => 'La contraseña actual es incorrecta',
            ], 400);
        }

    
        if (isset($validar['password']) && $validar['password'] !== $request->input('password_confirmation')) {
            return response()->json([
                'message' => 'La confirmación de la contraseña no coincide',
            ], 400);
        }


        if (!empty($validar) && isset($validar['name'])) {
            $user->name = $validar['name'];
            $user->name = $request->input('name');
        }

        if (!empty($validar) && isset($validar['username'])) {
            $user->username = $validar['username'];
            $user->username = $request->input('username');
        }

    
        if (!empty($validar) && isset($validar['email'])) {
            $user->email = $validar['email'];
            $user->email = $request->input('email');
        }

        
        if (!empty($validar) && isset($validar['password'])) {
            $user->password = bcrypt($validar['password']);
            $user->password = $request->input('password');
        }

        if (isset($validar['foto']) && !empty($validar['foto'])) {
            // Verifica si la cadena es una Base64 válida (comienza con 'data:image/...;base64,')
            if (preg_match('/^data:image\/(\w+);base64,/', $validar['foto'], $type)) {
                $imageData = substr($validar['foto'], strpos($validar['foto'], ',') + 1); // Extrae la parte Base64
                $imageData = base64_decode($imageData); // Decodifica la imagen

                if ($imageData === false) {
                    return response()->json(['message' => 'La imagen no es válida'], 400);
                }

                $imageName = 'foto_' . time() . '.png'; // Genera un nombre único
                $path = storage_path('app/public/img/' . $imageName); // Ruta de almacenamiento
                file_put_contents($path, $imageData); // Guarda la imagen en el servidor

                $user->foto = 'img/' . $imageName; // Guarda la ruta de la imagen en la base de datos
            } else {
                return response()->json(['message' => 'Formato de imagen no válido'], 400);
            }
        }
        

        $user->save();

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'user' => $user
        ], 200);
    }
    // metodo para eliminar un usuario
    public function deleteUser($id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El usuario no existe',
            ], 404);
        };

        $user->delete();

        return response()->json([
            'message'=>'El usuario ha sido eliminado correctamente',
            'user'=>$id,
        ],200);

    }
    // metodo para hacer login
    public function login(Request $request)
    {

        $request->validate([
            'username'=>'required|string',
            'password'=>'required|string|min:8',
        ]);

        $user= User::where('username', $request->username)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'message'=>'Credenciales incorrectas',
            ], 401);
        }

            $token = bin2hex(random_bytes(40));
            $user->token = $token;
            $user->save();

            return response()->json([
                'message'=>"Login correcto",
                'token'=>$token,
                'username'=>$user['username'],
                'id'=>$user['id']
            ],200);

    }
}
