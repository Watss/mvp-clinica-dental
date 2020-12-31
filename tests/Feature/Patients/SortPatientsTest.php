<?php

namespace Tests\Feature\Patients;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patient;

class SortPatientsTest extends TestCase
{
    use RefreshDatabase;

    /**
     @test
     */
    public function it_can_sort_patients_by_names_asc()
    {
        $p1 = factory(Patient::class)->create(['names' => 'BBBBB']);
        $p2 = factory(Patient::class)->create(['names' => 'AAAAA']);
        $p3 = factory(Patient::class)->create(['names' => 'CCCCC']);
        
        $url = route('patients.index',['sort' => 'names']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $p2->names,
            $p1->names,
            $p3->names
        ]);

    }

    /**
     @test
     */
    public function it_can_sort_patients_by_names_desc()
    {
        $p1 = factory(Patient::class)->create(['names' => 'BBBBB']);
        $p2 = factory(Patient::class)->create(['names' => 'AAAAA']);
        $p3 = factory(Patient::class)->create(['names' => 'CCCCC']);
        
        $url = route('patients.index',['sort' => '-names']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $p3->email,
            $p1->email,
            $p2->email,
        ]);

    }

     /**
     @test
     */
    public function it_can_sort_patients_by_created_at_asc()
    {
        $d1 = factory(Patient::class)->create();
        sleep(1);
        $d2 = factory(Patient::class)->create();
        sleep(1);
        $d3 = factory(Patient::class)->create();
        
        $url = route('patients.index',['sort' => 'created_at']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $d1->email,
            $d2->email,
            $d3->email
        ]);

    }
    
    /**
     @test
     */
    public function it_can_sort_patients_by_created_at_desc()
    {
        $d1 = factory(Patient::class)->create();
        sleep(1);
        $d2 = factory(Patient::class)->create();
        sleep(1);
        $d3 = factory(Patient::class)->create();
        
        $url = route('patients.index',['sort' => '-created_at']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $d3->email,
            $d2->email,
            $d1->email,
        ]);

    }
}
