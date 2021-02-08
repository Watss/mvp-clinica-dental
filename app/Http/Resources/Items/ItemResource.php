<?php

namespace App\Http\Resources\Items;

use App\Http\Resources\Categories\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return  [
            'type' => 'item',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'name' => $this->resource->name,
                'price'    => $this->resource->price,
                'active'    => $this->resource->active,
                'description' => $this->resource->description,
                'category_id' => $this->resource->category_id,
                
            ],
            'links' => [
                'self' => route('items.show', $this->resource),
            ],
        ];
    }
}
