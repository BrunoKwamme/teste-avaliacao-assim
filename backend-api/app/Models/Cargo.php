<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo para a tabela 'cargos'.
 * Um Cargo pode ter vários Funcionários (relacionamento one-to-many).
 */
class Cargo extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos em massa (correspondem às colunas da tabela)
    protected $fillable = [
        'nome',
        'salario',
    ];

    /**
     * Define o relacionamento: Um Cargo tem muitos Funcionários.
     * Necessário para verificar se o cargo pode ser excluído e para o relatório.
     */
    public function funcionarios(): HasMany
    {
        return $this->hasMany(Funcionario::class);
    }
}
