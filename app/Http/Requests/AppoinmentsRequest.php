<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppoinmentsRequest extends FormRequest
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
            'time' => ['required','max:8','min:2'],
            'stretch' => ['required','max:8','min:2'],
            'dentist_id' => [ 'required','numeric','exists:dentists,id'],
            'patient_id' => [ 'required','numeric','exists:patients,id'],
            'office_id' =>  ['required','numeric','exists:offices,id'],
        ];
    }
}
