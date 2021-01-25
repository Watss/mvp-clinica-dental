<?php

namespace App\Http\Resources\Categories;

use App\Http\Resources\Items\ItemCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    
    public function toArray($request){
        return  [
            'type' => 'category',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'name' => $this->resource->name,
            ],
            'links' => [
                'self' => route('categories.show', $this->resource),
            ], 
        ];
    }
}
