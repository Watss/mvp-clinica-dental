<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Payment extends Model
{
    public $allowedSorts = [];

    protected $fillable = [
        'date',
        'payment_method',
        'amount',
        'days_term',
        'details',
        'invoice',
        'dentist_id',
        'patient_id',
        'user_id',
        'office_id'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function dentist()
    {
        return $this->belongsTo(Dentist::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }
}
