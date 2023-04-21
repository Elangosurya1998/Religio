<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('Congregation')->nullable();
            $table->string('Province')->nullable();
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
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
