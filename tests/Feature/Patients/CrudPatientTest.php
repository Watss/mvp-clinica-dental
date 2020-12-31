<?php

namespace Tests\Feature\Patients;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patient;

class CrudPatientTest extends TestCase
{
    use RefreshDatabase;
    /**
        @test
     */
    public function can_create_patient()
    {
        $office = factory(\App\Models\Office::class)->create();
        
        $patientsData = [
            "names" =>  "abel ql",
            "last_name" => "coso coso",
            "rut" =>  "19072371k",
            "adress" => "sin dirección",
            "city" => "chillán",
            "email" => "email@email.cl",
            "phone_number" => "944921402",
            "office_id" => $office->id
        ];

        $response = $this->postJson(route('patients.store'),$patientsData);
        
        $response->assertJsonStructure([
            'success',
            'patient' => [
                'type',
                'id',
                'attributes' => [],
                'links' => []
            ]
        ]);

    }

    /**
    @test
     */
    public function can_update_without_rut_patient()
    {
        //$this->withoutExceptionHandling();
        $patient = factory(Patient::class)->create();
        
        $patientsData = [
            "names" =>  "abel 222ql",
            "last_name" => "coso coso",
            "rut" =>  "19072371k",
            "adress" => "sin disssssrección",
            "city" => "chillssssán",
            "email" => "email@email.cl",
            "phone_number" => "944221402",
            "office_id" => (String) $patient->office->id
        ];

        $response = $this->putJson(route('patients.update',$patient),$patientsData);
        $patientsData['rut'] = (String) $patient->rut;

        $response->assertJson([
            'success' => true,
            'patient' => [
                'type' => 'patient',
                'id' => (string) $patient->getRouteKey(),
                'attributes' => $patientsData,
                'links' => [
                    'self' => route('patients.show',$patient)
                ]
            ]
        ]);

    }
    /**
        @test
     */
    public function it_can_soft_delete_patient(){

        $patient = factory(Patient::class)->create();

        $response = $this->deleteJson(route('patients.destroy',$patient));
        
        //verify trashed dentist
        $patient = Patient::onlyTrashed()->find($patient->id);
        $this->assertNotNull($patient);
        
        //verify response correctly
        $response->assertJsonStructure([
            'success',
            'message'
        ]);
    }

    /**
        @test
     */
    public function it_can_restore_patient(){

        $patient = factory(Patient::class)->create();
        $patient->delete();
        
        $response = $this->postJson(route('patients.restore',$patient->id));
        
        //verify not trashed dentist
        $patients = Patient::find($patient->id);
        $this->assertNotNull($patient);
        
        //verify response correctly
        $response->assertJsonStructure([
            'success',
            'message'
        ]);
    }
    /**
        @test
     */
    public function not_can_store_patient_with_rut_repeat(){

        $rut = '19072378k';
        $patient = factory(Patient::class)->create(['rut' => $rut]);
        
        $patientsData = [
            "names" =>  "pedro juan",
            "last_name" => "juan juan",
            "rut" =>  $rut,
            "adress" => "sin dirección",
            "city" => "chillán",
            "email" => "email@email.cl",
            "phone_number" => "944921402",
            "office_id" => 1
        ];

        $response = $this->postJson(route('patients.store'),$patientsData);
        
        //verify response correctly
        $response->assertJsonStructure([
            'message',
            'errors' => [
                'rut' => []
            ],
            'status'
        ]);
    }
}
