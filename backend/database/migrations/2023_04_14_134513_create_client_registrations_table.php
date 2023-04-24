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
            $table->string('congregation')->nullable();
            $table->string('province')->nullable();
            $table->string('name')->nullable();
            $table->string('place')->nullable();
            $table->string('clientType')->nullable();
            $table->date('financialyear')->format('d/m/Y')->nullable();
            $table->string('clientcode')->nullable(); 
            $table->date('dateofjoining')->nullable(); 
            $table->date('dateofcontractsigning')->nullable();
            $table->date('amcDate')->nullable();
            $table->string('projectValue')->nullable();
            $table->string('amcvalue')->nullable();
            $table->string('projectStatus')->nullable();
            $table->string('fileAttachment')->nullable();
            $table->string('address1')->nullable();
            $table->string('state')->nullable();
            $table->string('address2')->nullable();
            $table->string('postcode')->nullable();
            $table->string('city')->nullable(); 
            $table->string('country')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
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
