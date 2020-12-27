<?php

namespace App;

use App\Models\Office;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'names','last_name','rut','adress','phone_number','user','password','office_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    //TODO: added sort and filter nessery methods

    public function office(){
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

    public function scopeOffice($query,$office){
        if($office)
            return $query->where('id','=',$office);
    }
}
