<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Http\Request;

/**
 * Gerencia as operações CRUD para Cargos.
 */
class CargoController extends Controller
{
    // Regras de validação para criação e atualização de cargos
    private $validationRules = [
        'nome' => 'required|string|min:3|max:100|unique:cargos,nome', // Nome é obrigatório e único
        'salario' => 'required|numeric|min:0.01', // Salário deve ser numérico e positivo
    ];

    /**
     * Lista todos os cargos ou filtra pelo nome (para a tela de pesquisa/tabela de cadastro).
     */
    public function index(Request $request)
    {
        $query = Cargo::query();

        // Implementa o campo de pesquisa por nome do cargo
        if ($request->has('nome') && $request->nome) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        $cargos = $query->orderBy('nome')->get();
        
        // Retorna a lista de cargos em formato JSON
        return response()->json($cargos);
    }

    /**
     * Armazena um novo cargo no banco de dados.
     */
    public function store(Request $request)
    {
        // Validação dos campos obrigatórios
        $validated = $request->validate($this->validationRules);

        $cargo = Cargo::create($validated);
        return response()->json($cargo, 201); // Retorna 201 Created
    }
    
    /**
     * Exibe um cargo específico (opcional, mas bom para edição).
     */
    public function show(Cargo $cargo)
    {
        return response()->json($cargo);
    }

    /**
     * Atualiza um cargo existente.
     */
    public function update(Request $request, Cargo $cargo)
    {
        // Ajusta a regra de unicidade do nome para ignorar o cargo atual
        $rules = $this->validationRules;
        $rules['nome'] = $rules['nome'] . ',' . $cargo->id;

        // Validação dos campos
        $validated = $request->validate($rules);

        $cargo->update($validated);
        return response()->json($cargo);
    }

    /**
     * Remove um cargo.
     */
    public function destroy(Cargo $cargo)
    {
        // Regra de segurança: Impedir a exclusão se houver funcionários associados
        if ($cargo->funcionarios()->exists()) {
            return response()->json(['message' => 'Não é possível excluir o cargo, pois há funcionários vinculados.'], 409); // Conflict
        }

        $cargo->delete();
        return response()->json(null, 204); // Retorna 204 No Content
    }
}