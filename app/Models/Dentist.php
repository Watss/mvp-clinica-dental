<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dentist extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'email','account_number','user_id'
    ];

    public $allowedSorts = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedules()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function scopeNames($query,$value){
        if($value){
            return $query->whereHas('user', function($query) use ($value){
                $query->likeName($value);
            });
        }
    }

    public function scopeRut($query,$rut){
        if($rut){
            return $query->whereHas('user', function($query) use ($rut){
                $query->rut($rut);
            });
        }
    }

    public function scopeOffice($query,$office){
        if($office){
            return $query->whereHas('user', function($query) use ($office){
                $query->office($office);
            });
        }
    }
}
