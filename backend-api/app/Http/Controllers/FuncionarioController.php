<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Gerencia as operações CRUD, Pesquisa e Relatório para Funcionários.
 */
class FuncionarioController extends Controller
{
    /**
     * Validação básica de formato de CPF (simulação).
     * NOTA: Para um projeto em produção no Brasil, é crucial usar uma biblioteca 
     * que valide o dígito verificador do CPF de forma completa.
     */
    protected function validateCpfFormat(string $cpf): bool
    {
        // Remove todos os caracteres que não são dígitos
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        // Deve ter 11 dígitos e não ser uma sequência repetida (ex: 111.111.111-11)
        if (strlen($cpf) !== 11 || preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        // Simulação: Apenas verifica o formato básico e a repetição
        // A validação completa do dígito verificador deve ser adicionada aqui
        return true; 
    }
    
    /**
     * Obtém as regras de validação para Funcionario (incluindo a Regra de Negócio do CPF).
     * @param int|null $id ID do funcionário para checagem de unicidade (null para criação)
     */
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
        'data_nascimento' => 'nullable|date',
        'email' => 'nullable|email|max:100',
        'telefone' => 'nullable|string|max:20',

        // Novos campos de endereço
        'cep' => 'nullable|string|max:10',
        'numero' => 'nullable|string|max:10',
        'logradouro' => 'nullable|string|max:150',
        'complemento' => 'nullable|string|max:100',
        'bairro' => 'nullable|string|max:100',
        'cidade' => 'nullable|string|max:100',
        'uf' => 'nullable|string|size:2', // UF deve ter 2 letras
    ];
}


    /**
     * Lista ou busca funcionários por nome e/ou CPF (Cadastro Funcionário).
     * O frontend deve carregar todos os dados ou apenas os filtrados.
     */
    public function index(Request $request)
    {
        // Usa with('cargo') para carregar o cargo do funcionário de forma eficiente
        $query = Funcionario::with('cargo');

        // Pesquisa por nome E/OU CPF (Lógica de Pesquisa)
        if ($request->has('pesquisa') && $request->pesquisa) {
            $pesquisa = $request->pesquisa;
            $query->where(function ($q) use ($pesquisa) {
                $q->where('nome', 'like', '%' . $pesquisa . '%')
                  ->orWhere('cpf', 'like', '%' . $pesquisa . '%');
            });
        }
        
        $funcionarios = $query->get();
        return response()->json($funcionarios);
    }
    
    /**
     * Exibe um funcionário específico.
     */
    public function show(Funcionario $funcionario)
    {
        return response()->json($funcionario->load('cargo'));
    }

    /**
     * Armazena um novo funcionário.
     */
    public function store(Request $request)
    {
        $validated = $request->validate($this->getValidationRules());
        
        $funcionario = Funcionario::create($validated);
        // Retorna o objeto completo para o frontend
        return response()->json($funcionario->load('cargo'), 201); 
    }

    /**
     * Atualiza um funcionário existente.
     */
    public function update(Request $request, Funcionario $funcionario)
    {
        // Passa o ID para que a regra de unicidade do CPF ignore o próprio registro.
        $validated = $request->validate($this->getValidationRules($funcionario->id));

        $funcionario->update($validated);
        return response()->json($funcionario->load('cargo'));
    }

    /**
     * Remove um funcionário.
     */
    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();
        return response()->json(null, 204);
    }

    /**
     * Endpoint para Relatório: Exibe Nome, Telefone, Cargo e Salário, com filtros.
     */
    public function relatorio(Request $request)
    {
        $query = Funcionario::with('cargo');

        // Filtro por nome do funcionário
        if ($request->has('nome') && $request->nome) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        // Filtro por nome do cargo
        if ($request->has('cargo_nome') && $request->cargo_nome) {
            $cargo_nome = $request->cargo_nome;
            // Filtra pelo relacionamento 'cargo'
            $query->whereHas('cargo', function ($q) use ($cargo_nome) {
                $q->where('nome', 'like', '%' . $cargo_nome . '%');
            });
        }
        
        // Mapeia o resultado para o formato de relatório desejado
        $funcionarios = $query->get()->map(function ($funcionario) {
            // Verifica se o relacionamento 'cargo' existe antes de acessar
            $cargoNome = $funcionario->cargo->nome ?? 'Cargo Não Encontrado';
            $salarioFormatado = 'N/A';
            
            if ($funcionario->cargo) {
                 // Formatação de salário em pt-BR
                 $salarioFormatado = 'R$ ' . number_format($funcionario->cargo->salario, 2, ',', '.');
            }
            
            return [
                'nome' => $funcionario->nome,
                'telefone' => $funcionario->telefone ?? 'N/A', // Telefone não obrigatório
                'cargo' => $cargoNome,
                'salario' => $salarioFormatado,
            ];
        });

        return response()->json($funcionarios);
    }
}
