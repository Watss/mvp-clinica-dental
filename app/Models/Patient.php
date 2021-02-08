<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'names','last_name','rut','adress','phone_number','email','city','disabled','office_id' // añadi office ide
    ];

    protected $casts = [
        'disabled' => 'boolean'
    ];

    public $allowedSorts = [
        'id',
        'names',
        'created_at',
        'updated_at',
        'office_id'
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function scopelikeName($query,$value){
        if($value)
            return $query->where('names', 'like', "%$value%");
    }

    public function scopeRut($query,$rut){
        if($rut)
            return $query->where('rut', '=', $rut);
    }


}
