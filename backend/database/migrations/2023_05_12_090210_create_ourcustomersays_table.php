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
        Schema::create('ourcustomersays', function (Blueprint $table) {
            $table->id();
            $table->integer('congregation')->length(11)->index();
            $table->integer('province')->length(11)->index();
            $table->integer('client')->length(11)->index();
            $table->string('title',255);
            $table->text('comments');
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
        Schema::dropIfExists('ourcustomersays');
    }
};
