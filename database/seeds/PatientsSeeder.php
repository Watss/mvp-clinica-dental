<?php

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Patient::create([
            'names' => 'paciente 1',
            'last_name' => 'prueba',
            'rut' => '1-7',
            'adress' => 'chillancito',
            'phone_number' => '133',
            'email' => 'nose ',
            'city' => '123',
            'office_id' => '1',
            'disabled' => '0',


        ]);
    }
}
