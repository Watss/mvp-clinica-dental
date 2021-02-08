<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'type' => 'users',
            'id'   => $this->resource->getRouteKey(),
            'attributes' => [
                'names' => $this->resource->names,
                'last_name'    => $this->resource->last_name,
                'rut'   => $this->resource->rut,
                'adress' => $this->resource->adress,
                'phone_number' => $this->resource->phone_number,
            ],
            'links' => [
                'self' => route('users.show', $this->resource),
            ],
            'relationships' => [
                //'office' => Office::make($this->resource->debit), //TODO: pending Office resource
            ] 
        ];
    }
}
