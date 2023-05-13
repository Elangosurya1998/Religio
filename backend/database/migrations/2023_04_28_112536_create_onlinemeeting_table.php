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
        Schema::create('onlinemeeting', function (Blueprint $table) {
            $table->id();
            $table->string("onlinemeeting")->nullable();
            $table->string("onlinedate")->nullable();
            $table->string("onlinehours")->nullable();
            $table->string("onlinerating")->nullable();
            $table->string("online")->nullable();
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
        Schema::dropIfExists('onlinemeeting');
    }
};
