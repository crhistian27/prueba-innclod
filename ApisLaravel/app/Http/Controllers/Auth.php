<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth extends BaseController
{
    public function __construct()
    {
       $this->middleware('', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $key_JWT_SECRET = env('JWT_SECRET');

        $user = $request->user;
        $pass = $request->pass;

        if(!$user || !$pass){

            return response()->json([
                'status'=>500,
                'message' => 'Campos incompletos'
            ],500);
        }

        $infoUsuario = DB::select('SELECT * FROM tbl_users WHERE user_user = "'.$user.'"');

        if( COUNT($infoUsuario) == 0 ){
            return response()->json([
                'status'=>500,
                'message' => 'Usuario / Contraseña incorrecta'
            ],500);
        }

        if( $infoUsuario[0]->user_estado == 2 ){
            return response()->json([
                'status'=>500,
                'message' => 'Este usuario no esta admitido'
            ],500);
        }

        //$password = bcrypt('Abc123');
        //$password = Hash::make('secret');
        $validPassword = Hash::check($pass,$infoUsuario[0]->user_password);

        if( !$validPassword ){
            return response()->json([
                'status'=>500,
                'message' => 'Usuario / Contraseña incorrecta'
            ],500);
        }

        $arr =  ["token"=>$infoUsuario[0]->user_id] ;

        $token = JWT::encode($arr,$key_JWT_SECRET, 'HS256');

        return response()->json([
            'status'=>200,
            'token' => $token
        ],200);
       
    }
}
