<?php

namespace App\Models;

use App\User;
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


    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function dentist()
    {
        return $this->belongsTo(Dentist::class);
    }
}
