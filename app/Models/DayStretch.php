<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DayStretch extends Model
{
    protected $table = "day_stretch";

    protected $fillable = ['day_id','strech_id','schadule_id'];

    public function schedule(){
        return $this->belongsTo(Schedule::class);
    }

    public function stretch(){
        return $this->belongsTo(Stretch::class);
    }

    public function day(){
        return $this->belongsTo(Day::class);
    }
}
