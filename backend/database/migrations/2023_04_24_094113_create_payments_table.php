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

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('clienttype')->nullable();
            $table->string('congregation')->nullable();
            $table->string('province')->nullable();
            $table->string('product')->nullable();
            $table->string('place')->nullable();
            $table->string('financialyear')->nullable();
            $table->string('clientcode')->nullable();
            $table->string('pi')->nullable();
            $table->string('balancepaid')->nullable();
            $table->string('renewelmonth')->nullable();
            $table->string('projectvalue')->nullable();
            $table->string('amcvalue')->nullable();
            $table->string('gst')->nullable();
            $table->string('total')->nullable();
            $table->string('paid')->nullable();
            $table->string('balance')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('payments');
    }
};
