<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo para a tabela 'funcionarios'.
 * Um Funcionário pertence a um Cargo.
 */
class Funcionario extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos em massa (Mass Assignable).
    // Correspondem às colunas da sua tabela 'funcionarios'.
    protected $fillable = [
    'nome',
    'cpf',
    'data_nascimento',
    'telefone',
    'email',
    'cargo_id',
    // Novos campos de endereço
    'cep',
    'numero',
    'logradouro',
    'complemento',
    'bairro',
    'cidade',
    'uf',
];

    /**
     * Define o relacionamento: Um Funcionário pertence a um Cargo.
     * Isso permite carregar o cargo de um funcionário usando $funcionario->cargo.
     */
    public function cargo(): BelongsTo
    {
        // Assume que a chave estrangeira é 'cargo_id' (padrão Laravel)
        return $this->belongsTo(Cargo::class);
    }
}