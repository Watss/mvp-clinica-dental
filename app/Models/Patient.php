<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'names','last_name','rut','adress','phone_number','email','city','disabled','office_id' // añadi office ide
    ];

    protected $casts = [
        'disabled' => 'boolean'
    ];

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

}
