<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doc_documento extends Model
{
   use HasFactory;

   protected $fillable = [
      'DOC_ID', 'DOC_NOMBRE', 'DOC_CODIGO', 'DOC_CONTENIDO', 'DOC_ID_TIPO', 'DOC_ID_PROCESO'
   ];
   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'doc_documento';

   public $timestamps= false;

   /**
    * The primary key associated with the table.
    *
    * @var string
    */
   protected $primaryKey = 'DOC_ID';

   /**
    * Indicates if the model's uid is auto-incrementing.
    *
    * @var bool
    */
   public $incrementing = true;

   public function newTransaction()
   {
   }
}
