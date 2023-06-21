<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Pro_proceso as ProcesoModel;

class Procesos extends BaseController
{
    public function __construct()
    {
       $this->middleware('', ['except' => ['ver','crear','editar','eliminar']]);
    }

    public function ver(Request $request)
    {
        $sql = ProcesoModel::select('*')->get();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function crear(Request $request)
    {

        $idUsu          = $request->USUARIO_DATA->user_id;

        $PRO_PREFIJO    = $request->PRO_PREFIJO ;
        $PRO_NOMBRE     = $request->PRO_NOMBRE;
      
        $fecha          = date("Y-m-d H:i:s");

        if(!$PRO_PREFIJO || !$PRO_NOMBRE ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new ProcesoModel();
        $sql->PRO_PREFIJO = $PRO_PREFIJO;
        $sql->PRO_NOMBRE = $PRO_NOMBRE;
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
        
        $id             = $request->PRO_ID;
        $PRO_PREFIJO    = $request->PRO_PREFIJO ;
        $PRO_NOMBRE     = $request->PRO_NOMBRE;

        $fecha          = date("Y-m-d H:i:s");

        if(!$PRO_PREFIJO || !$PRO_NOMBRE ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new ProcesoModel();
        $sql->exists = true;
        $sql->PRO_ID = $id; //already exists in database.
        $sql->PRO_PREFIJO =$PRO_PREFIJO;
        $sql->PRO_NOMBRE =$PRO_NOMBRE;
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
        
        $sql=ProcesoModel::where('PRO_ID',$id)->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

}
