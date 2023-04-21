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
        Schema::create('client_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('Congregation')->nullable();
            $table->string('Province')->nullable();
            $table->string('Name')->nullable();
            $table->string('Place')->nullable();
            $table->string('ClientType')->nullable();
            $table->date('FinancialYear')->format('d/m/Y')->nullable();
            $table->integer('ClientCode')->nullable(); 
            $table->date('DateofJoining')->nullable(); 
            $table->date('DateofContractSigning')->nullable();
            $table->date('AMCDate')->nullable();
            $table->string('ProjectValue')->nullable();
            $table->string('AMCvalue')->nullable();
            $table->string('ProjectStatus')->nullable();
            $table->string('FileAttachment')->nullable();
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
        Schema::dropIfExists('client_registrations');
    }
};
