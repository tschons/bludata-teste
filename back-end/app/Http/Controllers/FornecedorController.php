<?php

namespace App\Http\Controllers;

use App\Empresa;
use App\Estado;
use App\Fornecedor;
use App\FornPessFisica;
use App\FornPessJuridica;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FornecedorController extends Controller{

    private static $tipoFisica = 'F';
    private static $tipoJuridica = 'J';

    public function listFornecedores(Request $request, Response $response){

        try{

            $query = $request->query;

            $nome = $query->get('nome');
            $cpfCnpj = $query->get('cpf_cnpj');
            $dataCadIni = $query->get('data_cad_ini');
            $dataCadFim = $query->get('data_cad_fim');

            $queryBuilder = Fornecedor::select(
                    'fornecedores.*',
                    'empresas.nome_fant as emp_nome_fant',
                    'fisica.rg',
                    'fisica.data_nasc',
                    'fisica.cpf',
                    'juridica.cnpj'
                )
                ->join('empresas', 'empresas.id', '=', 'emp_id')
                ->leftJoin('forn_pess_fisica as fisica', 'fisica.forn_id', '=', 'fornecedores.id')
                ->leftJoin('forn_pess_juridica as juridica', 'juridica.forn_id', '=', 'fornecedores.id');

            if($nome){
                $queryBuilder->where('fornecedores.nome', 'like', "%$nome%");
            }

            if($cpfCnpj) {
                $queryBuilder->where(function ($query) use ($cpfCnpj) {

                    $query->orWhere('fisica.cpf', 'like', "%$cpfCnpj%")
                        ->orWhere('juridica.cnpj', 'like', "%$cpfCnpj%");

                });
            }

            if($dataCadIni){
                $dataCadIni = date("Y-m-d 00:00:00", strtotime($dataCadIni));
                $queryBuilder->where('fornecedores.data_cad', '>=', $dataCadIni);
            }

            if($dataCadFim){
                $dataCadFim = date("Y-m-d 23:59:59", strtotime($dataCadFim));
                $queryBuilder->where('fornecedores.data_cad', '<=', $dataCadFim);
            }

            return $queryBuilder->get();

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));
        }
    }

    private function validateRegister(Request $request){

        try{
            $data = $request->json();

            // Não é permitido cadastrar um fornecedor do estado do paraná,
            // pessoa física, com menos de 18 anos
            if($data->get('tipo') == self::$tipoFisica){

                $regra = [
                    'idade' => 18,
                    'estado' => 'PR'
                ];

                $dataNasc = new \DateTime($data->get('data_nasc'));
                $today = new \DateTime();

                $interval = $today->diff($dataNasc);

                if($interval->y < $regra['idade']){

                    $estado = Empresa::select('estados.sigla')
                        ->join('estados', 'estado_id', 'estados.id')
                        ->where('empresas.id', '=', $data->get('emp_id'))
                        ->first();

                    if($estado->sigla == $regra['estado']){
                        throw new \Exception('Fornecedor não pode estar vinculado a uma empresa do Paraná, ser pessoa física e possuir menos de 18 anos');
                    }
                }
            }

        }catch (\Exception $error){
            return $error->getMessage();
        }
    }

    public function createFornecedor(Request $request, Response $response){

        try{

            $errorMessage = $this->validateRegister($request);
            if(!empty($errorMessage)){
                throw new \Exception($errorMessage);
            }

            $data = $request->json();

            $fornecedor = new Fornecedor();
            $fornecedor->setAttribute('nome', $data->get('nome'));
            $fornecedor->setAttribute('tipo', $data->get('tipo'));
            $fornecedor->setAttribute('emp_id', $data->get('emp_id'));
            $fornecedor->save();

            switch ($data->get('tipo')){
                case self::$tipoFisica:

                    $fornPessFisica = new FornPessFisica();
                    $fornPessFisica->setAttribute('forn_id', $fornecedor->getAttribute('id'));
                    $fornPessFisica->setAttribute('rg', $data->get('rg'));
                    $fornPessFisica->setAttribute('cpf', $data->get('cpf'));
                    $fornPessFisica->setAttribute('data_nasc', $data->get('data_nasc'));
                    $fornPessFisica->save();
                    break;

                case self::$tipoJuridica:

                    $fornPessJuridica = new FornPessJuridica();
                    $fornPessJuridica->setAttribute('forn_id', $fornecedor->getAttribute('id'));
                    $fornPessJuridica->setAttribute('cnpj', $data->get('cnpj'));
                    $fornPessJuridica->save();
                    break;
            }

            return json_encode(array('id' => $fornecedor->getAttribute('id')));
        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function editFornecedor(Request $request, Response $response, $id){

        try {

            $errorMessage = $this->validateRegister($request);
            if(!empty($errorMessage)){
                throw new \Exception($errorMessage);
            }

            $data = $request->json();

            $fornecedor = Fornecedor::find($id);
            $fornecedor->setAttribute('nome', $data->get('nome'));
            $fornecedor->setAttribute('tipo', $data->get('tipo'));
            $fornecedor->setAttribute('emp_id', $data->get('emp_id'));
            $fornecedor->save();

            switch ($data->get('tipo')) {
                case self::$tipoFisica:

                    $fornPessFisica = FornPessFisica::find($data->get('id'));

                    // Caso tenha trocado de jurídica para física
                    if(is_null($fornPessFisica)){
                        $fornPessFisica = new FornPessFisica();
                        $fornPessFisica->setAttribute('forn_id', $data->get('id'));

                        $fornPessJuridica = FornPessJuridica::find($data->get('id'));
                        $fornPessJuridica->delete();
                    }

                    $fornPessFisica->setAttribute('rg', $data->get('rg'));
                    $fornPessFisica->setAttribute('cpf', $data->get('cpf'));
                    $fornPessFisica->setAttribute('data_nasc', $data->get('data_nasc'));
                    $fornPessFisica->save();

                    break;

                case self::$tipoJuridica:

                    $fornPessJuridica = FornPessJuridica::find($data->get('id'));

                    // Caso tenha trocado de física para jurídica
                    if(is_null($fornPessJuridica)){
                        $fornPessJuridica = new FornPessJuridica();
                        $fornPessJuridica->setAttribute('forn_id', $data->get('id'));

                        $fornPessFisica = FornPessFisica::find($data->get('id'));
                        $fornPessFisica->delete();
                    }

                    $fornPessJuridica->setAttribute('cnpj', $data->get('cnpj'));
                    $fornPessJuridica->save();

                    break;
            }
        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function loadFornecedor(Request $request, Response $response, $id){

        try{

            $fornecedor = Fornecedor::find($id);

            switch($fornecedor['tipo']){
                case self::$tipoFisica:

                    $fornecedor = FornPessFisica
                        ::join('fornecedores', 'forn_id', '=', 'id')
                        ->where('id', '=', $id)
                        ->get();
                    break;

                case self::$tipoJuridica:

                    $fornecedor = FornPessJuridica
                        ::join('fornecedores', 'forn_id', '=', 'id')
                        ->where('id', '=', $id)
                        ->get();
                    break;
            }

            unset($fornecedor[0]['forn_id']);
            return json_encode($fornecedor[0]);

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function deleteFornecedor(Request $request, Response $response, $id){
        try{

            $fornecedor = Fornecedor::find($id);
            $fornecedor->delete();

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }
}