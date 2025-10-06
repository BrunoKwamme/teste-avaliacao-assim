<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cargo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'salario',
    ];

    public function funcionarios(): HasMany
    {
        return $this->hasMany(Funcionario::class);
    }
}
