<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Dentist;
use Faker\Generator as Faker;

$factory->define(Dentist::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
        'account_number' => $faker->creditCardNumber,
        'user_id' => factory(App\User::class)
    ];
});
