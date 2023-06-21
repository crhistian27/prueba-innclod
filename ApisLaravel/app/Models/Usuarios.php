<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
   use HasFactory;

   protected $fillable = [
      'user_id', 'user_user', 'user_password', 'user_estado'
   ];
   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'tbl_users';

   public $timestamps= false;

   /**
    * The primary key associated with the table.
    *
    * @var string
    */
   protected $primaryKey = 'user_id';

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
