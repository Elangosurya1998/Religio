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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("congregation")->nullable();
            $table->string("province")->nullable();
            $table->string("name")->nullable();
            $table->string("dataserver")->nullable();
            $table->string("instance")->nullable();
            $table->string("testURL")->nullable();
            $table->string("textusername")->nullable();
            $table->string("textpassword")->nullable();
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
        Schema::dropIfExists('projects');
    }
};
