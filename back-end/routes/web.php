<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'estado'], function () use ($router) {
    $router->get('/', 'EstadoController@listEstados');
});

$router->group(['prefix' => 'empresa'], function () use ($router) {
    $router->post('', 'EmpresaController@createEmpresa');
    $router->put('/{id}', 'EmpresaController@editEmpresa');
    $router->get('', 'EmpresaController@listEmpresas');
    $router->get('/{id}', 'EmpresaController@loadEmpresa');
    $router->delete('{id}', 'EmpresaController@deleteEmpresa');
});

$router->group(['prefix' => 'fornecedor'], function () use ($router) {
    $router->get('', 'FornecedorController@listFornecedores');
    $router->get('/{id}', 'FornecedorController@loadFornecedor');
    $router->post('', 'FornecedorController@createFornecedor');
    $router->put('/{id}', 'FornecedorController@editFornecedor');
    $router->delete('/{id}', 'FornecedorController@deleteFornecedor');
});

$router->group(['prefix' => 'telefone'], function () use ($router) {
    $router->get('/fornecedor/{forn_id}', 'TelefoneController@listTelefones');
    $router->post('', 'TelefoneController@createTelefone');
    $router->delete('/{id}', 'TelefoneController@deleteTelefone');
});