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
            $table->string('congregation')->nullable();
            $table->string('province')->nullable();
            $table->string('address1')->nullable();
            $table->string('state')->nullable();
            $table->string('address2')->nullable();
            $table->string('postcode')->nullable();
            $table->string('city')->nullable(); 
            $table->string('country')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable(); 
            $table->string('contactname')->nullable(); 
            $table->string('contactrole')->nullable(); 
            $table->string('contactemail')->nullable(); 
            $table->string('contactmobile')->nullable(); 
            $table->string('contactstatus')->nullable(); 
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
