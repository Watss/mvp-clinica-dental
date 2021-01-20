<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'names' => 'secretaria prueba',
            'last_name' => 'prueba',
            'rut' => '1-9',
            'adress' => 'chillancito',
            'phone_number' => '133',
            'user' => 'nose ',
            'password' => '123',
            'office_id' => '1',

        ]);
    }
}
