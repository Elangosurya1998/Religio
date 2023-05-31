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
        Schema::create('domainrenewal', function (Blueprint $table) {
            $table->id();
            $table->string('sitename',255);
            $table->string('siteurl',255);
            $table->string('serverdetail',255);
            $table->string('servername',255);
            $table->date('domain_create_date');
            $table->date('domain_expire_date');
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
        Schema::dropIfExists('domainrenewal');
    }
};
