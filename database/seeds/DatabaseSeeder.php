<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(OfficesSeeder::class);
         $this->call(UsersSeeder::class);
         $this->call(PatientsSeeder::class);
         $this->call(DentistSeeder::class);
    }
}
