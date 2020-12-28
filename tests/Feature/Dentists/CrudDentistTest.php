<?php

namespace Tests\Feature\Dentists;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Dentist;
use App\User;

class CrudDentistTest extends TestCase
{
    use RefreshDatabase;
    /**
        @test
     */
    public function can_create_dentist()
    {
        $user = factory(User::class)->create();
        $this->withoutExceptionHandling();
        $dentistData = [
            "names" =>  "abel ql",
            "last_name" => "coso coso",
            "rut" =>  "19072371k",
            "user" =>  "a.apablaza",
            "password" => "12121212",
            "adress" => "sin dirección",
            "phone_number" => "944921402",
            "office_id" => 1
        ];

        $response = $this->postJson(route('dentists.store'),$dentistData);

        $response->assertJsonStructure([
            'success',
            'dentist' => [
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
    public function can_update_without_rut_dentist()
    {
        $this->withoutExceptionHandling();
        $dentist = factory(Dentist::class)->create();
        
        $dentistData = [
            "names" =>  'name modify',
            "last_name" => 'last_name modify',
            "rut" =>  'other rut',
            "user" =>  'other user',
            "adress" => "other address",
            "account_number" => '8789427897289',
            'email' => 'testingemail@mail.cl',
            "phone_number" => "987654321",
        ];

        $response = $this->putJson(route('dentists.update',$dentist),$dentistData);
        $dentistData['rut'] = $dentist->user->rut;
        $dentistData['user_id'] = (string) $dentist->user_id;

        $response->assertExactJson([
            'success' => true,
            'dentist' => [
                'type' => 'dentist',
                'id' => (string) $dentist->getRouteKey(),
                'attributes' => $dentistData,
                'links' => [
                    'self' => route('dentists.show',$dentist)
                ]
            ]
        ]);

    }

    /**
        @test
     */
    public function it_can_soft_delete_dentist(){

        $dentist = factory(Dentist::class)->create();

        $response = $this->deleteJson(route('dentists.destroy',$dentist));
        
        //verify trashed dentist
        $dentist = Dentist::onlyTrashed()->find($dentist->id);
        $this->assertNotNull($dentist);
        
        //verify response correctly
        $response->assertJsonStructure([
            'success',
            'message'
        ]);
    }

    /**
        @test
     */
    public function it_can_restore_dentist(){

        $dentist = factory(Dentist::class)->create();
        $dentist->delete();
        
        $response = $this->postJson(route('dentists.restore',$dentist->id));
        
        //verify not trashed dentist
        $dentist = Dentist::find($dentist->id);
        $this->assertNotNull($dentist);
        
        //verify response correctly
        $response->assertJsonStructure([
            'success',
            'message'
        ]);
    }

     /**
        @test
     */
    public function not_can_delete_dentist_if_this_is_deleted(){

        $dentist = factory(Dentist::class)->create();
        $dentist->delete();

        $response = $this->deleteJson(route('dentists.destroy',$dentist));

        //verify response correctly
        $response->assertJson([
            'message' => 'Not Found',
            'status' => 404
        ]);
    }

    /**
        @test
     */
    public function not_can_restore_dentist_if_this_not_deleted(){
        
        $dentist = factory(Dentist::class)->create();
        
        $response = $this->postJson(route('dentists.restore',$dentist));

        //verify response correctly
        $response->assertJson([
            'message' => 'Not Found',
            'status' => 404
        ]);
    }
}
