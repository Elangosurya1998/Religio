<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('congregation', function (Blueprint $table) {
            $table->id()->index();
            $table->string('CongregationName')->nullable()->index();
            $table->string('Address1')->nullable();
            $table->string('state')->nullable();
            $table->string('Address2')->nullable();
            $table->string('Postcode')->nullable();
            $table->string('City')->nullable();
            $table->string('country')->nullable(); 
            $table->string('Mobile')->nullable();
            $table->string('Email')->nullable();
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
        Schema::dropIfExists('congregation');
    }
};
