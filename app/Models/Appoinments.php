<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appoinments extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'date','time','stretch','dentis_id','patient_id','user_id','office_id'
    ];

    public $allowedSorts = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
