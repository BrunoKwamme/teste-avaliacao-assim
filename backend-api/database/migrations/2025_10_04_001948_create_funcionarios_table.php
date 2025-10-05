<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 150);
            $table->date('data_nascimento')->nullable();
            //endereço
            $table->string('cep', 10)->nullable();
            $table->string('logradouro', 150)->nullable();
            $table->string('numero', 20)->nullable();
            $table->string('complemento', 100)->nullable();
            $table->string('bairro', 100)->nullable();
            $table->string('cidade', 100)->nullable();
            $table->string('uf', 2)->nullable();

            $table->string('cpf', 11)->unique();// CPF deve ser único
            $table->string('email', 150)->nullable();
            $table->string('telefone', 20)->nullable();

            $table->foreignId('cargo_id')->constrained('cargos'); 
            
            $table->timestamps();
        });
    }
};
