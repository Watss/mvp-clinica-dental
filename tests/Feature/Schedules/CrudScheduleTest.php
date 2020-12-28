<?php

namespace Tests\Feature\Schedules;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CrudScheduleTest extends TestCase
{
    use RefreshDatabase;
    /**
        @test
     */
    public function can_create_schedule_and_details()
    {
        
        $scheduleData = [
            "name" =>  "calendario personalizado",
            "schedule_details" => [
                [
                    'day_name' => 'Lunes',
                    'day_number' => '1',
                    'start_time' => '08:00:00',
                    'end_time' => '19:00:00',
                    'rest_start_time' => '13:00:00',
                    'rest_end_time' => '14:00:00',
                ],
                [
                    'day_name' => 'Martes',
                    'day_number' => '2',
                    'start_time' => '08:00:00',
                    'end_time' => '19:00:00',
                    'rest_start_time' => '13:00:00',
                    'rest_end_time' => '14:00:00',
                ],
                [
                    'day_name' => 'Miercoles',
                    'day_number' => '3',
                    'start_time' => '08:00:00',
                    'end_time' => '19:00:00',
                    'rest_start_time' => '13:00:00',
                    'rest_end_time' => '14:00:00',
                ]
            ]
        ];

        $response = $this->postJson(route('schedules.store'),$scheduleData);
        
        $response->assertStatus(201);
        
        $response->assertJsonStructure([
            'success',
            'schedule' => [
                'type',
                'id',
                'attributes' => [
                    'name',
                    'details',
                    'created_at',
                    'updated_at'
                ],
                'links' => []
            ]
        ]);

    }
}
