<?php

namespace App\Http\Resources\Patients;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //dd($this->resource->getRouteKey());
        return  [

            'type' => 'patients',
            'id'   => $this->resource->getRouteKey(),
            'attributes' => [
                'names' => $this->resource->names,
                'last_name' => $this->resource->last_name,
                'rut' => $this->resource->rut,
                'adress' => $this->resource->adress,
                'phone_number' => $this->resource->phone_number,
                'city' => $this->resource->city,
                'office_id' => $this->resource->office_id
            ],
            'links' => [
                'self' => route('patients.show', $this->resource),
            ],
            'relationships' => [

            ]
        ];
    }
}
