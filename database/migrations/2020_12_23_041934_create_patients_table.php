<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('names',50);
            $table->string('last_name',50);
            $table->string('rut')->unique();
            $table->string('adress');
            $table->string('phone_number');
            $table->string('email')->nullable();
            $table->string('city',100)->nullable();
            $table->boolean('disabled')->default(false);
            $table->foreignId('office_id')->constrained()->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
