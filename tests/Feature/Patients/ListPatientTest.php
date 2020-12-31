<?php

namespace Tests\Feature\Patients;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patient;

class ListPatientTest extends TestCase
{
    use RefreshDatabase;

    /**
        @test
     */
    public function can_fetch_all_patients()
    {
        $patients = factory(Patient::class)->times(5)->create();

        $expect = array(
            'data' => [],
        );
        //verify can see json with dentist created
        foreach ($patients as $patient) {
            array_push($expect['data'],
                [
                    'type' => 'patient',
                    'id' => (string) $patient->getRouteKey(),
                    'attributes' => [
                        'names' => $patient->names,
                        'last_name' => $patient->last_name,
                        'adress' => $patient->adress,
                        'email' => $patient->email,
                        'phone_number' =>  $patient->phone_number,
                        'rut' => (string) $patient->rut,
                        'city' => $patient->city,
                        'office_id' => (string) $patient->office_id,
                    ],
                    'links' => [
                        'self' => route('patients.show',$patient)
                    ]
                ]
            );
        }
        $response = $this->getJson(route('patients.index'));
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
    public function can_fetch_single_patient()
    {
        $patient = factory(Patient::class)->create();

        $response = $this->getJson(route('patients.show',$patient));

        $response->assertExactJson([
            'data' => [
                'type' => 'patient',
                'id' => (string) $patient->getRouteKey(),
                'attributes' => [
                    'names' => $patient->names,
                    'last_name' => $patient->last_name,
                    'adress' => $patient->adress,
                    'email' => $patient->email,
                    'phone_number' =>  $patient->phone_number,
                    'rut' => (string) $patient->rut,
                    'city' => $patient->city,
                    'office_id' => (string) $patient->office_id,
                ],
                'links' => [
                    'self' => route('patients.show',$patient)
                ]
            ]
        ]);
    }
}
