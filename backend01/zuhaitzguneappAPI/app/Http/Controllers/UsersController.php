<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    

public function getAllUsers(){

$users=User::get();

return response()->json($users);

}

public function getUserById($id){

$user=User::find($id);

if(!$user){
    return response()->json([
        'message' => 'El usuario no existe',
    ], 404);
}

return response()->json($user);

}

public function createUser(Request $request){

    $validar=$request->validate([
'name'=>'required|string|max:255',
'email'=>'required|email|unique:users,email',
'password'=>'required|string|min:8',     
'username'=>'required|string|unique:users,username', 
'foto'=>'nullable|string',  
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

public function updateUser(Request $request, $id)
{
   
    $validar = $request->validate([
        'name' => 'nullable|string|max:255', 
        'username'=>'nullable|string|unique:users,username',
        'email' => 'nullable|email|unique:users,email,' . $id, 
        'password' => 'nullable|string|min:8|confirmed',
        'current_password' => 'required_if:password,!=,null|string|min:8',
        'foto'=>'nullable|string',
    ]);

    
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'message' => 'El usuario no existe',
        ], 404);
    }

    
    if (isset($validar['password']) && !\Hash::check($validar['current_password'], $user->password)) {
        return response()->json([
            'message' => 'La contraseña actual es incorrecta',
        ], 400);
    }

   
    if (isset($validar['password']) && $validar['password'] !== $request->input('password_confirmation')) {
        return response()->json([
            'message' => 'La confirmación de la contraseña no coincide',
        ], 400);
    }


    if (isset($validar['name'])) {
        $user->name = $validar['name'];
    }

    if (isset($validar['username'])) {
        $user->username = $validar['username'];
    }

   
    if (isset($validar['email'])) {
        $user->email = $validar['email'];
    }

    
    if (isset($validar['password'])) {
        $user->password = bcrypt($validar['password']);
    }

    if (isset($validar['foto'])) {
        $user->foto = $validar['foto'];
    }

    $user->save();

    return response()->json([
        'message' => 'Usuario actualizado correctamente',
        'user' => $user
    ], 200);
}

public function deleteUser($id){

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

public function login(Request $request){

$request->validate([
    'username'=>'required|string',
    'password'=>'required|string|min:8',
]);

$user= User::where('username', $request->username)->first();

if(!$user || !\Hash::check($request->password, $user->password)){
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
    ],200);

}

}
