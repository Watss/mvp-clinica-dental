<?php

namespace App\Http\Resources\Schedule;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
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
            'type' => 'schedule',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'name' => $this->resource->name,
                'details' => $this->resource->details,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->created_at,                
            ],
            'links' => [
                'self' => route('schedule.show', $this->resource),
            ],
        
        ];
    }
}
