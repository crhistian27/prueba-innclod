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
use App\Models\Pro_proceso as ProcesoModel;
use App\Models\Doc_documento as DocumentoModel;

class Documento extends BaseController
{
    public function __construct()
    {
       $this->middleware('', ['except' => ['ver','crear','editar','eliminar']]);
    }

    public function ver(Request $request)
    {

        $sql = DB::select('SELECT  d.*,
                                    CONCAT("(",t.TIP_PREFIJO,")"," ",t.TIP_NOMBRE) AS TIPO,
                                    CONCAT("(",p.PRO_PREFIJO,")"," ",p.PRO_NOMBRE) AS PROCESO,
                                    (t.TIP_PREFIJO) AS PREFIJO1,
                                    (p.PRO_PREFIJO) AS PREFIJO2
                                    FROM doc_documento d
                                    INNER JOIN tic_tipo_doc t ON TIP_ID = D.DOC_ID_TIPO
                                    INNER JOIN pro_proceso  p ON PRO_ID = D.DOC_ID_PROCESO
                                    WHERE 1');

        $tipo = TipoModel::all();
        $proceso = ProcesoModel::all();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
            'tipo'=>$tipo,
            'proceso'=>$proceso
        ],200);
       
    }

    public function crear(Request $request)
    {

        $idUsu          = $request->USUARIO_DATA->user_id;

        $DOC_NOMBRE     = $request->DOC_NOMBRE ;
        $PREFIJO1       = $request->PREFIJO1;
        $PREFIJO2       = $request->PREFIJO2;
        $DOC_CONTENIDO  = $request->DOC_CONTENIDO;
        $DOC_ID_TIPO    = $request->DOC_ID_TIPO;
        $DOC_ID_PROCESO = $request->DOC_ID_PROCESO;
      
        $fecha          = date("Y-m-d H:i:s");

        if(!$DOC_NOMBRE || !$DOC_CONTENIDO || !$DOC_ID_TIPO || !$DOC_ID_PROCESO ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        
        $sql = new DocumentoModel();
        $sql->DOC_NOMBRE = $DOC_NOMBRE;
        $sql->DOC_CODIGO = "";
        $sql->DOC_CONTENIDO = $DOC_CONTENIDO;
        $sql->DOC_ID_TIPO = $DOC_ID_TIPO;
        $sql->DOC_ID_PROCESO = $DOC_ID_PROCESO;
        $sql->save();

        $data =DocumentoModel::latest('DOC_ID')->first();

        $sqlUpdate = new DocumentoModel();
        $sqlUpdate->exists = true;
        $sqlUpdate->DOC_ID = $data['DOC_ID']; //already exists in database.
        $sqlUpdate->DOC_CODIGO =  $PREFIJO1."-".$PREFIJO2."-".$data['DOC_ID'];
        $sqlUpdate->save();

        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

    public function editar(Request $request)
    {
        $idUsu          = $request->USUARIO_DATA->user_id;
        
        $id             = $request->DOC_ID;
        $DOC_NOMBRE     = $request->DOC_NOMBRE ;
        $PREFIJO1       = $request->PREFIJO1;
        $PREFIJO2       = $request->PREFIJO2;
        $DOC_CONTENIDO  = $request->DOC_CONTENIDO;
        $DOC_ID_TIPO    = $request->DOC_ID_TIPO;
        $DOC_ID_PROCESO = $request->DOC_ID_PROCESO;

        $fecha          = date("Y-m-d H:i:s");

        if(!$DOC_NOMBRE || !$DOC_CONTENIDO || !$DOC_ID_TIPO || !$DOC_ID_PROCESO ){
            return response()->json([
                'status'=>400,
                'message'=>'Campos incompletos',
            ],400);
        }

        $sql = new DocumentoModel();
        $sql->exists = true;
        $sql->DOC_ID = $id; //already exists in database.
        $sql->DOC_NOMBRE =  $DOC_NOMBRE;
        $sql->DOC_CODIGO =  $PREFIJO1."-".$PREFIJO2."-".$id;
        $sql->DOC_CONTENIDO =  $DOC_CONTENIDO;
        $sql->DOC_ID_TIPO =  $DOC_ID_TIPO;
        $sql->DOC_ID_PROCESO =  $DOC_ID_PROCESO;
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
        
        $sql=DocumentoModel::where('DOC_ID',$id)->delete();
        
        return response()->json([
            'status'=>200,
            'message'=>'Registro exitoso',
            'result'=>$sql,
        ],200);
       
    }

}
