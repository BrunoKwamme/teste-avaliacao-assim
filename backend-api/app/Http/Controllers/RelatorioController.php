<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Funcionario;

class RelatorioController extends Controller
{
    public function funcionarios(Request $request)
    {
        $query = Funcionario::with('cargo');

        if ($request->has('nome') && $request->nome) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->has('cargo') && $request->cargo) {
            $cargo_nome = $request->cargo;
            $query->whereHas('cargo', function ($q) use ($cargo_nome) {
                $q->where('nome', 'like', '%' . $cargo_nome . '%');
            });
        }

        $funcionarios = $query->get()->map(function ($funcionario) {
            return [
                'nome' => $funcionario->nome,
                'telefone' => $funcionario->telefone ?? 'N/A',
                'cargo_nome' => $funcionario->cargo->nome ?? 'Cargo Não Encontrado',
                'salario' => $funcionario->cargo
                    ? number_format($funcionario->cargo->salario, 2, '.', '')
                    : '0.00',
            ];
        });
        return response()->json($funcionarios);
    }
}
