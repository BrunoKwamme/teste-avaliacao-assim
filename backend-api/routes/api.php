<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\RelatorioController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui você pode registrar rotas da API para sua aplicação.
| O Laravel, por padrão, já inclui o middleware 'api' nessas rotas.
|
*/

//Rota de teste
Route::get('ping', function ()
{
    return response ()->json(['message' => 'Pong!']);
});


// --- Rotas para Cadastro de Cargos (CRUD e Pesquisa) ---
// Utiliza Route::apiResource para criar endpoints RESTful completos:
// GET    /api/cargos          -> index (Listagem/Pesquisa)
// POST   /api/cargos          -> store (Criação)
// GET    /api/cargos/{cargo}  -> show (Exibição de um item)
// PUT    /api/cargos/{cargo}  -> update (Alteração)
// DELETE /api/cargos/{cargo}  -> destroy (Exclusão)
Route::apiResource('cargos', CargoController::class);


// --- Rotas para Cadastro de Funcionários (CRUD e Pesquisa) ---
// Utiliza Route::apiResource para criar endpoints RESTful completos:
// GET    /api/funcionarios          -> index (Listagem/Pesquisa)
// POST   /api/funcionarios          -> store (Criação)
// GET    /api/funcionarios/{func}   -> show (Exibição de um item)
// PUT    /api/funcionarios/{func}   -> update (Alteração)
// DELETE /api/funcionarios/{func}   -> destroy (Exclusão)
Route::apiResource('funcionarios', FuncionarioController::class);


// --- Rotas para Relatório ---
// Rota GET específica para a página de Relatório (filtros por nome/cargo)
// Endpoint: /api/relatorio/funcionarios
Route::get('/relatorio/funcionarios', [RelatorioController::class, 'funcionarios']);