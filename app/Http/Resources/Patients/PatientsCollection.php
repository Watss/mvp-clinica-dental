<?php

namespace App\Http\Resources\Patients;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PatientsCollection extends ResourceCollection
{

    public $collects = PatientsResource::class;
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
