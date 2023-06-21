<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tic_tipo_doc extends Model
{
   use HasFactory;

   protected $fillable = [
      'TIP_ID', 'TIP_NOMBRE', 'TIP_PREFIJO'
   ];
   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'tic_tipo_doc';

   public $timestamps= false;

   /**
    * The primary key associated with the table.
    *
    * @var string
    */
   protected $primaryKey = 'TIP_ID';

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
