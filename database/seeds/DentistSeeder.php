<?php

use App\Models\Dentist;
use Illuminate\Database\Seeder;

class DentistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Dentist::create([
            'email' => 'dettista@gmail.com',
            'account_number' => '123456',
            'user_id' => '2',


        ]);
    }
}
