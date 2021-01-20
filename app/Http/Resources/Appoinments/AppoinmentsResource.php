<?php

namespace App\Http\Resources\Appoinments;

use Illuminate\Http\Resources\Json\JsonResource;

class Appoinments extends JsonResource
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

            'type' => 'appoinments',
            'id'   => (String) $this->resource->getRouteKey(),
            'attributes' => [

            ],
            'links' => [

            ]
        ];
    }
}
