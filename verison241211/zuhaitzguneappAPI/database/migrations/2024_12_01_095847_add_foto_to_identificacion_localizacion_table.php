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
        Schema::table('identificacion_localizacion', function (Blueprint $table) {
            $table->string('foto')->nullable(); // Añade la columna 'foto' de tipo string 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('identificacion_localizacion', function (Blueprint $table) {
            //
            $table->dropColumn('foto');
        });
    }
};
