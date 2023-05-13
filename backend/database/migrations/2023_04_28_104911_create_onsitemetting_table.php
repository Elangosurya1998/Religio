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
        Schema::create('onsitemeeting', function (Blueprint $table) {
            $table->id();
            $table->string("onsitedate")->nullable();
            $table->string("onsitedays")->nullable();
            $table->string("expensive")->nullable();
            $table->string("onsiteplace")->nullable();
            $table->string("onsiterating")->nullable();
            $table->string("onsite")->nullable();  
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
        Schema::dropIfExists('onsitemeeting');
    }
};
