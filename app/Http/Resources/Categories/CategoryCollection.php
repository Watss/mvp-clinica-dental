<?php

namespace App\Http\Resources\Categories;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryCollection extends ResourceCollection
{
    public $collects = CategoryResource::class;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'counts' => $this->collection->count()
            ]
        ];
    }
}
