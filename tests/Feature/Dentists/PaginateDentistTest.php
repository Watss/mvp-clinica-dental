<?php

namespace Tests\Feature\Dentists;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Dentist;


class PaginateDentistTest extends TestCase
{
    use RefreshDatabase;
    /**
     @test
     */
    public function can_fetch_paginated_dentists()
    {
        $size = 2;
        $numberPage = 3;

        $dentists = factory(Dentist::class)->times(10)->create();
        $dentists->created_at = "2020-12-12";

        $url = route('dentists.index', ['page[size]' => $size, 'page[number]' => $numberPage]);
        
        $response = $this->getJson($url);

        $response->assertJsonCount($size,'data')
            ->assertDontSee($dentists[0]->user->names)
            ->assertDontSee($dentists[1]->user->names)
            ->assertDontSee($dentists[2]->user->names)
            ->assertDontSee($dentists[3]->user->names)
            ->assertSee($dentists[4]->user->names) // cant see dentist in page 
            ->assertSee($dentists[5]->user->names)
            ->assertDontSee($dentists[6]->user->names)
            ->assertDontSee($dentists[7]->user->names)
            ->assertDontSee($dentists[8]->user->names)
            ->assertDontSee($dentists[9]->user->names);

        $response->assertJsonStructure([
            'links' => ['first','last','prev','next']
        ]);

        $response->assertJsonFragment([
            'first' => route('dentists.index',['page[size]' => $size, 'page[number]' => 1]),
            'last' => route('dentists.index',['page[size]' => $size, 'page[number]' => $dentists->count() / $size]),
            'prev' => route('dentists.index',['page[size]' => $size, 'page[number]' => $numberPage - 1]),
            'next' => route('dentists.index',['page[size]' => $size, 'page[number]' => $numberPage + 1]),
        ]);
    }
}
