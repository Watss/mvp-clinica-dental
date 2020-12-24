<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = [
        'name','adress','name_administrator'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function patients()
    {
        return $this->hasMany(Patient::class);
    }
}
