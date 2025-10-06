<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Http\Request;


class CargoController extends Controller
{
    private $validationRules = [
        'nome' => 'required|string|min:3|max:100|unique:cargos,nome',
        'salario' => 'required|numeric|min:0.01',
    ];

    //search
    public function index(Request $request)
    {
        $query = Cargo::query();

        if ($request->has('nome') && $request->nome) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        $cargos = $query->orderBy('nome')->get();
        
        return response()->json($cargos);
    }

    //create
    public function store(Request $request)
    {
        $validated = $request->validate($this->validationRules);

        $cargo = Cargo::create($validated);
        return response()->json($cargo, 201);
    }
    //read
    public function show(Cargo $cargo)
    {
        return response()->json($cargo);
    }
    //update
    public function update(Request $request, Cargo $cargo)
    {
        $rules = $this->validationRules;
        $rules['nome'] = $rules['nome'] . ',' . $cargo->id;

        $validated = $request->validate($rules);

        $cargo->update($validated);
        return response()->json($cargo);
    }
    //delete
    public function destroy(Cargo $cargo)
    {
        if ($cargo->funcionarios()->exists()) {
            return response()->json(['message' => 'Não é possível excluir o cargo, pois há funcionários vinculados.'], 409); // Conflict
        }

        $cargo->delete();
        return response()->json(null, 204);
    }
}