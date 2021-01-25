<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'price',
        'category_id',
        'active',
        'description'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'price' => 'double',
        'category_id' => 'integer',
        'active' => 'boolean'
    ];

    public $allowedSorts = [
        'id',
        'category_id',
        'name',
        'price'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeCategory($query,$category){
        if($category)
            return $query->where('category_id','=',$category);
    }

    public function scopeName($query,$name){
        
        if($name)
            return $query->where('name','like',"%$name%");
    }
}
