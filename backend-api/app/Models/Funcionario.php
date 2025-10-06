<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Funcionario extends Model
{
    use HasFactory;

    protected $fillable = [
    'nome',
    'cpf',
    'data_nascimento',
    'telefone',
    'email',
    'cargo_id',
    'cep',
    'numero',
    'logradouro',
    'complemento',
    'bairro',
    'cidade',
    'uf',
];

    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class);
    }
}