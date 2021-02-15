<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => ['required','date'],
            'payment_method' => ['required','in:Efectivo,Cheque,Tarjeta'],
            'amount' => ['required','numeric'],
            'days_term' => ['numeric'],
            'details' => ['max:255'],
            'invoice' => ['required','numeric','unique:payments,invoice'],
            'dentist_id' => ['required','numeric','exists:dentists,id'],
            'patient_id' => ['required','numeric','exists:patients,id'],
            'office_id' => ['required','numeric','exists:offices,id']
        ];
    }
}
