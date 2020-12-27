<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientsRequest extends FormRequest
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
                'names' => ['required','max:50','min:2'],
                'last_name' => ['required','max:50','min:2'],
                'rut' => ['required','max:12','min:3'], // falta unique
                'adress' => ['required','min:2'],
                'phone_number' => ['required','min:9','max:12'],
                'email' => ['email'],
                'city' => ['required','max:50','min:2'],
                'office_id' => ['required','numeric','exists:offices,id'],
            ];



    }
}
