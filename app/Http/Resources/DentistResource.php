<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DentistResource extends JsonResource
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
            'type' => 'dentist',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'names' => $this->resource->user->names,
                'last_name'    => $this->resource->user->last_name,
                'user' => $this->resource->user->user,
                'rut'   => $this->resource->user->rut,
                'adress' => $this->resource->user->adress,
                'phone_number' => $this->resource->user->phone_number,
                'account_number' => $this->resource->account_number,
                'email' => $this->resource->email,
                'user_id' => (string) $this->resource->user_id,
                'created_at' => $this->resource->created_at
            ],
            'links' => [
                'self' => route('dentists.show', $this->resource),
            ],
        ];
    }
}
