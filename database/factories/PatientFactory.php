<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Patient;
use App\Models\Office;
use Faker\Generator as Faker;

$factory->define(Patient::class, function (Faker $faker) {
    return [
        'names' => $faker->name,
        'last_name' => $faker->name,
        'rut' => $faker->unique()->randomNumber,
        'email' => $faker->email,
        'adress' => $faker->address,
        'phone_number' => $faker->phoneNumber,
        'city' => $faker->city,
        'office_id' => Office::find(1) ? 1 : factory(Office::class)->create(),
    ];
});
