<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100)->unique(); // Nome é obrigatório e único
            $table->decimal('salario', 10, 2);    // Salário é obrigatório
            $table->timestamps();
        });
    }
};
