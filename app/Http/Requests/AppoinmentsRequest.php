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
            'date' => ['required','max:50','min:2'],
            'time' => ['required','max:50','min:2'],
            'stretch' => ['required','max:50','min:2'],
            'dentis_id' => ['required','max:50','min:2'],
            'patient_id' => ['required','max:50','min:2'],
            'office_id' => ['required','max:50','min:2']
        ];
    }
}
