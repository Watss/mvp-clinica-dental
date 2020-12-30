<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
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
            'name' => ['required','max:50','min:1','unique:schedules,name'],
            'schedule_id' => ['exists:schedule,id'],
            'schedule_details' => ['array'],
            'schedule_details.*.day_number' => ['required','numeric'],
            'schedule_details.*.day_name' => ['required'],
            'schedule_details.*.start_time' => ['required'],
            'schedule_details.*.end_time' => ['required'],
            'schedule_details.*.rest_start_time' => ['required'],
            'schedule_details.*.rest_end_time' => ['required'],
        ];
    }
}
