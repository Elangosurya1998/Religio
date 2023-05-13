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
        Schema::create('datasupports', function (Blueprint $table) {
            $table->id();
            $table->string("noofcommunity")->nullable();
            $table->string("noofinstitution")->nullable();
            $table->string("noofmembers")->nullable();
            $table->string("dataentry")->nullable();
            $table->integer('client_id');
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
        Schema::dropIfExists('datasupports');
    }
};
