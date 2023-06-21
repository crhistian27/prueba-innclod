<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;


//use Illuminate\Cookie\Middleware\TokenTime as Middleware;

class ValidarJwt
{
	public function handle($request, Closure $next)
	{

		$key_JWT_SECRET = env('JWT_SECRET');
		$token = $request->header('x-token');

		$routeName = $request->route()->uri;

		if( !$token ){
			return response()->json([
				'status'=>500,
				'message' => 'No hay token en la peticion'
			 ],500);
		}

		try {
			$merchantToken = JWT::decode($token, new Key($key_JWT_SECRET, 'HS256'));
		} catch (Exception $err) {
			return response()->json(['message' => 'Token expirado'],500);
		}


		$infoUsuario = DB::select(' SELECT * FROM tbl_users WHERE user_id = '.$merchantToken->token);   

		if( COUNT($infoUsuario) == 0 ){
			return response()->json([
			   'resp' => [],
			   'status'=>500,
			   'message' => 'Token no valido'
			],500);
		 }
   
		 if( $infoUsuario[0]->user_estado == 2){
			return response()->json([
			   'resp' => [],
			   'status'=>500,
			   'message' => 'Este usuario no esta admitido'
			],500);
		 }


		$request->merge(['USUARIO_DATA' => (object) $infoUsuario[0]]);

		return $next($request);
	}
}
