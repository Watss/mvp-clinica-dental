<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleDetail extends Model
{
    protected $fillable = [
        'day_name','day_number','start_time','end_time','rest_start_time','rest_end_time','schedule_id'
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

}
