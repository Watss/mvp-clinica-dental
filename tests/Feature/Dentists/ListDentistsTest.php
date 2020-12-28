<?php

namespace Tests\Feature\Dentists;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Dentist;

class ListDentistsTest extends TestCase
{

    use RefreshDatabase;

    /**
        @test
     */
    public function can_fetch_all_dentists()
    {
        $dentists = factory(Dentist::class)->times(5)->create();

        $expect = array(
            'data' => [],
        );
        //verify can see json with dentist created
        foreach ($dentists as $dentist) {
            array_push($expect['data'],
                [
                    'type' => 'dentist',
                    'id' => (string) $dentist->getRouteKey(),
                    'attributes' => [
                        'names' => $dentist->user->names,
                        'last_name' => $dentist->user->last_name,
                        'adress' => $dentist->user->adress,
                        'email' => $dentist->email,
                        'phone_number' =>  $dentist->user->phone_number,
                        'rut' => $dentist->user->rut,
                        'user' => $dentist->user->user,
                        'account_number' => $dentist->account_number,
                        'user_id' => (string) $dentist->user_id,
                    ],
                    'links' => [
                        'self' => route('dentists.show',$dentist)
                    ]
                ]
            );
        }
        $response = $this->getJson(route('dentists.index'));
        //verify data
        $response->assertJsonFragment($expect);
        //verify links and meta
        $response->assertJsonStructure([
            'links' => [],
            'meta' => []
        ]);

    }
    /**
        @test
     */
    public function can_fetch_single_dentist()
    {
        $dentist = factory(Dentist::class)->create();

        $response = $this->getJson(route('dentists.show',$dentist));

        $response->assertExactJson([
            'data' => [
                'type' => 'dentist',
                'id' => (string) $dentist->getRouteKey(),
                'attributes' => [
                    'names' => $dentist->user->names,
                    'last_name' => $dentist->user->last_name,
                    'adress' => $dentist->user->adress,
                    'email' => $dentist->email,
                    'phone_number' =>  $dentist->user->phone_number,
                    'rut' => $dentist->user->rut,
                    'user' => $dentist->user->user,
                    'account_number' => $dentist->account_number,
                    'user_id' => (string) $dentist->user_id,
                ],
                'links' => [
                    'self' => route('dentists.show',$dentist)
                ]
            ]
        ]);
    }
}
