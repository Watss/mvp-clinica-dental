<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SchedileDetail;
use Faker\Generator as Faker;

$factory->define(SchedileDetail::class, function (Faker $faker) {
    return [
        'day_name' => $faker->dayOfWeek,
        'day_number' => rand(1,6),
        'start_time' => $faker->time,
        'end_time' => $faker->time,
        'rest_start_time' => $faker->time,
        'rest_end_time' => $faker->time,
        'schedule_id' => 1
    ];
});
