<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pro_proceso extends Model
{
   use HasFactory;

   protected $fillable = [
      'PRO_ID', 'PRO_PREFIJO', 'PRO_NOMBRE'
   ];
   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'pro_proceso';

   public $timestamps= false;

   /**
    * The primary key associated with the table.
    *
    * @var string
    */
   protected $primaryKey = 'PRO_ID';

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
