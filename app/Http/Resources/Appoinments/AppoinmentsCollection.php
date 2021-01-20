<?php

namespace App\Http\Resources\Appoinments;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AppoinmentsCollection extends ResourceCollection
{
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
