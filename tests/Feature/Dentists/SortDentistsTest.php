<?php

namespace Tests\Feature\Dentists;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Dentist;
use App\User;

class SortDentistsTest extends TestCase
{
    use RefreshDatabase;

    /**
     @test
     */
    public function it_can_sort_dentists_by_id_asc()
    {
        $d1 = factory(Dentist::class)->create();
        $d2 = factory(Dentist::class)->create();
        $d3 = factory(Dentist::class)->create();
        
        $url = route('dentists.index',['sort' => 'id']);

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
    public function it_can_sort_dentists_by_id_desc()
    {
        $d1 = factory(Dentist::class)->create();
        $d2 = factory(Dentist::class)->create();
        $d3 = factory(Dentist::class)->create();
        
        $url = route('dentists.index',['sort' => '-id']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $d3->email,
            $d2->email,
            $d1->email,
        ]);

    }

     /**
     @test
     */
    public function it_can_sort_dentists_by_created_at_asc()
    {
        $d1 = factory(Dentist::class)->create();
        sleep(1);
        $d2 = factory(Dentist::class)->create();
        sleep(1);
        $d3 = factory(Dentist::class)->create();
        
        $url = route('dentists.index',['sort' => 'created_at']);

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
    public function it_can_sort_dentists_by_created_at_desc()
    {
        $d1 = factory(Dentist::class)->create();
        sleep(1);
        $d2 = factory(Dentist::class)->create();
        sleep(1);
        $d3 = factory(Dentist::class)->create();
        
        $url = route('dentists.index',['sort' => '-created_at']);

        $response = $this->getJson($url);

        $response->assertSeeInOrder([
            $d3->email,
            $d2->email,
            $d1->email,
        ]);

    }

}
