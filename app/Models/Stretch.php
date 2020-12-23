<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stretch extends Model
{
    protected $fillable = [
        'start_time','end_time','rest_start_time','rest_end_time'
    ];

    public function days(){
        return $this->belongsToMany(Day::class);
    }

    public function schedules(){
        return $this->belongsToMany(Schedule::class);
    }
}
