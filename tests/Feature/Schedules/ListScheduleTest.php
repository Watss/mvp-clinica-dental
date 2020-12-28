<?php

namespace Tests\Feature\Schedules;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Schedule;

class ListScheduleTest extends TestCase
{
    use RefreshDatabase;

    /**
        @test
     */
    public function can_fetch_all_schedules()
    {
        $this->withoutExceptionHandling();

        $schedules = factory(Schedule::class)->times(5)->create();
        
        $expect = array(
            'data' => [],
        );
        //verify can see json with dentist created
        foreach ($schedules as $schedule) {
            array_push($expect['data'],
                [
                    'type' => 'schedule',
                    'id' => (string) $schedule->getRouteKey(),
                    'attributes' => [
                        'name' => $schedule->name,
                        'details' => [],
                        'created_at' => $schedule->created_at,
                        'updated_at' => $schedule->updated_at
                    ],
                    'links' => [
                        'self' => route('schedules.show',$schedule)
                    ]
                ]
            );
        }
        $response = $this->getJson(route('schedules.index'));
        //verify data
        $response->assertJsonFragment($expect);
    }
    /**
        @test
     */
    public function can_fetch_single_schedule()
    {
        $schedule = factory(Schedule::class)->create();

        $response = $this->getJson(route('schedules.show',$schedule));

        $response->assertExactJson([
            'data' => [
                'type' => 'schedule',
                'id' => (string) $schedule->getRouteKey(),
                'attributes' => [
                    'name' => $schedule->name,
                    'details' => [],
                    'created_at' => $schedule->created_at,
                    'updated_at' => $schedule->updated_at
                ],
                'links' => [
                    'self' => route('schedules.show',$schedule)
                ]
            ]
        ]);
    }
}
