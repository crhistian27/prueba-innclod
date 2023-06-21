<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Tic_tipo_doc as TipoModel;

class Tipo extends BaseController
{
    public function __construct()
    {
        $this->middleware('', ['except' => ['ver','crear','editar','eliminar']]);
    }

    public function ver(Request $request)
    {


        $sql = TipoModel::select('*')->get();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function crear(Request $request)
    {

        $idUsu          = $request->USUARIO_DATA->user_id;

        $TIP_PREFIJO    = $request->TIP_PREFIJO ;
        $TIP_NOMBRE     = $request->TIP_NOMBRE;
      
        $fecha          = date("Y-m-d H:i:s");

        if(!$TIP_PREFIJO || !$TIP_NOMBRE ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new TipoModel();
        $sql->TIP_PREFIJO = $TIP_PREFIJO;
        $sql->TIP_NOMBRE = $TIP_NOMBRE;
        $sql->save();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function editar(Request $request)
    {
        $idUsu          = $request->USUARIO_DATA->user_id;
        
        $id             = $request->TIP_ID;
        $TIP_NOMBRE    = $request->TIP_NOMBRE ;
        $TIP_PREFIJO     = $request->TIP_PREFIJO;

        $fecha          = date("Y-m-d H:i:s");

        if(!$TIP_NOMBRE || !$TIP_PREFIJO ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new TipoModel();
        $sql->exists = true;
        $sql->TIP_ID = $id; //already exists in database.
        $sql->TIP_PREFIJO =$TIP_PREFIJO;
        $sql->TIP_NOMBRE =$TIP_NOMBRE;
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
        
        $sql=TipoModel::where('TIP_ID',$id)->delete();
        
        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

}
