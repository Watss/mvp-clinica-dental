<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [ 'name' ];

    public function dentists(){
        return $this->belongsToMany(Dentist::class);
    }
    
    public function details(){
        return $this->hasMany(ScheduleDetail::class);
    }
}
