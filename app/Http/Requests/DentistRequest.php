<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DentistRequest extends FormRequest
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
        $update = $this->method() == 'PUT';
        if($update){
            $id = $this->dentist->user_id;
        }
        return [
            'names' => ['required','max:50','min:2'],
            'last_name' => ['required','max:50','min:2'],
            'rut' => [
                'required','max:9','min:8', 
                $update ? "unique:users,rut,$id,id" : 'unique:users,rut,id'
            ],
            'user' =>[
                'required','max:20','min:3',
                $update ? "unique:users,user,$id,id" : 'unique:users,rut,id'
            ],
            'password' => [
                $update ? '' : 'required', 'min:6'
            ],
            'office_id' => ['required','numeric','exists:offices,id'],
            'adress' => ['required','min:2'],
            'phone_number' => ['required','min:9','max:12'],
            'email' => ['email'],
            'account_number' => ['numeric'],
        ];
    }
}
