<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Usuarios as UsuariosModel;

class Usuarios extends BaseController
{
    public function __construct()
    {
        $this->middleware('', ['except' => ['ver','crear','editar','eliminar','password']]);
    }

    public function ver(Request $request)
    {

        $infoUsuarios = UsuariosModel::select('*',
        DB::raw("(CASE WHEN user_estado='1' THEN 'ACTIVO'  ELSE 'INACTIVO' END) as estado"))
        ->get();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$infoUsuarios,
        ],200);
       
    }

    public function crear(Request $request)
    {

        $idUsu      = $request->USUARIO_DATA->user_id;
        $user_user  = $request->user_user;
        $user_password = $request->user_password;
        $fecha      = date("Y-m-d H:i:s");

        if(!$user_user || !$user_password ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $passCrpto = bcrypt($user_password);

        $infoUsuarios = new UsuariosModel();
        $infoUsuarios->user_user = $user_user;
        $infoUsuarios->user_password = $passCrpto;
        $infoUsuarios->user_estado = 1;
        $infoUsuarios->save();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$infoUsuarios,
        ],200);
       
    }

    public function editar(Request $request)
    {
        $id = $request->user_id;
        $idUsu      = $request->USUARIO_DATA->user_id;
        $user_user  = $request->user_user;
        $fecha = date("Y-m-d H:i:s");

        if(!$user_user){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new UsuariosModel();
        $sql->exists = true;
        $sql->user_id = $id; //already exists in database.
        $sql->user_user =$user_user;
        $sql->save();


        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function eliminar(Request $request)
    {
        $id = $request->id;
        
        $sql=UsuariosModel::where('user_id',$id)->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function password(Request $request)
    {
        $id             = $request->user_id;
        $idUsu          = $request->USUARIO_DATA->user_id;
        $user_password  = $request->user_password;
        $fecha          = date("Y-m-d H:i:s");

        if(!$user_password ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }
        
        $passCrpto = bcrypt($user_password);

        $sql = new UsuariosModel();
        $sql->exists = true;
        $sql->user_id = $id; //already exists in database.
        $sql->user_password =$passCrpto;
        $sql->save();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }
}
