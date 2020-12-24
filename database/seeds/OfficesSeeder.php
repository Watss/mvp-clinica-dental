<?php

use Illuminate\Database\Seeder;
use App\Models\Office;

class OfficesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Office::create([
            'name' => 'Oficina 1',
            'adress' => 'sin dirección',
            'name_administrator' => 'Diego González'
        ]);
    }
}
