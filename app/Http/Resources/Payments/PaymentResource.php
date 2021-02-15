<?php

namespace App\Http\Resources\Payments;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'type' => 'payment',
            'id'   => (string) $this->resource->getRouteKey(),
            'attributes' => [
                'date' => $this->resource->date,
                'payment_method' => $this->resource->payment_method,
                'amount' => $this->resource->amount,
                'days_term' => $this->resource->days_term,
                'details' => $this->resource->details,
                'invoice' => $this->resource->invoice,
                'dentist_id' => $this->resource->dentist_id,
                'patient_id' => $this->resource->patient_id,
                'user_id' => (string) $this->resource->user_id,
                'office_id' => $this->resource->office_id,
                'created_at' => $this->resource->created_at
            ],
        ];
    }
}
