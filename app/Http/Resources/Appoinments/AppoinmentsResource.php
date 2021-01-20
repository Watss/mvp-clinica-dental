<?php

namespace App\Http\Resources\Appoinments;

use Illuminate\Http\Resources\Json\JsonResource;

class AppoinmentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        //dd($this->resource->user);
        return  [

            'type' => 'appoinments',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'date' => $this->resource->created_at,
                'time' => $this->resource->time,
                'dentis'=>$this->resource->dentist->load('user'),
                'patient' => $this->resource->patient,
                'user' => $this->resource->user,
                'office' => $this->resource->office,
            ],
            'links' => []
        ];
    }
}
