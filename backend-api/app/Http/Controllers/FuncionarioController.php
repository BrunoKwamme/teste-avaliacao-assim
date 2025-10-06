<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FuncionarioController extends Controller
{
    protected function validateCpfFormat(string $cpf): bool
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        if (strlen($cpf) !== 11 || preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }
        return true; 
    }
    
    private function getValidationRules(?int $id = null): array
    {
        return [
            'cpf' => [
                'required', 
                'string', 
                'max:14',
                Rule::unique('funcionarios')->ignore($id),
                function ($attribute, $value, $fail) {
                    if (!$this->validateCpfFormat($value)) {
                        $fail('O campo CPF informado não é válido ou está no formato incorreto.');
                    }
                },
            ],
            'nome' => 'required|string|max:150',
            'cargo_id' => 'required|exists:cargos,id',
            'data_nascimento' => 'nullable|date_format:Y-m-d',//formato y/m/d gera problema de auto complete.
            'email' => 'nullable|email|max:100',
            'telefone' => 'nullable|string|max:20',

            // endereço
            'cep' => 'nullable|string|max:10',
            'numero' => 'nullable|string|max:10',
            'logradouro' => 'nullable|string|max:150',
            'complemento' => 'nullable|string|max:100',
            'bairro' => 'nullable|string|max:100',
            'cidade' => 'nullable|string|max:100',
            'uf' => 'nullable|string|size:2',
        ];
    }


    //search
    public function index(Request $request)
    {
        $query = Funcionario::with('cargo');

        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->filled('cpf')) {
            $query->where('cpf', 'like', '%' . $request->cpf . '%');
        }

        return response()->json($query->get());
    }

    //read
    public function show(Funcionario $funcionario)
    {
        return response()->json($funcionario->load('cargo'));
    }

    //create
    public function store(Request $request)
    {
        \Log::info('Payload recebido store:', $request->all());
        $validated = $request->validate($this->getValidationRules());
        
        $funcionario = Funcionario::create($validated);
        return response()->json($funcionario->load('cargo'), 201); 
    }

    //update
    public function update(Request $request, Funcionario $funcionario)
    {
        $validated = $request->validate($this->getValidationRules($funcionario->id));

        $funcionario->update($validated);
        return response()->json($funcionario->load('cargo'));
    }

    //delete
    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();
        return response()->json(null, 204);
    }
}
