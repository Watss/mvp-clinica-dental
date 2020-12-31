<?php

namespace Tests\Feature\Patients;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patient;

class PaginatePatientTest extends TestCase
{
    use RefreshDatabase;
    /**
     @test
     */
    public function can_fetch_paginated_patients()
    {
        $size = 2;
        $numberPage = 3;

        $patients = factory(Patient::class)->times(10)->create();

        $url = route('patients.index', ['page[size]' => $size, 'page[number]' => $numberPage]);
        
        $response = $this->getJson($url);

        $response->assertJsonCount($size,'data')
            ->assertDontSee($patients[0]->names)
            ->assertDontSee($patients[1]->names)
            ->assertDontSee($patients[2]->names)
            ->assertDontSee($patients[3]->names)
            ->assertSee($patients[4]->names) // cant see patients in page 
            ->assertSee($patients[5]->names)
            ->assertDontSee($patients[6]->names)
            ->assertDontSee($patients[7]->names)
            ->assertDontSee($patients[8]->names)
            ->assertDontSee($patients[9]->names);

        $response->assertJsonStructure([
            'links' => ['first','last','prev','next']
        ]);

        $response->assertJsonFragment([
            'first' => route('patients.index',['page[size]' => $size, 'page[number]' => 1]),
            'last' => route('patients.index',['page[size]' => $size, 'page[number]' => $patients->count() / $size]),
            'prev' => route('patients.index',['page[size]' => $size, 'page[number]' => $numberPage - 1]),
            'next' => route('patients.index',['page[size]' => $size, 'page[number]' => $numberPage + 1]),
        ]);
    }
}
