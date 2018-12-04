<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Empresa;

class EmpresaController extends Controller{

    public function createEmpresa(Request $request, Response $response){

        try {
            $data = $request->json();

            $empresa = new Empresa();
            $empresa->setAttribute('estado_id', $data->get('estado_id'));
            $empresa->setAttribute('nome_fant', $data->get('nome_fant'));
            $empresa->setAttribute('cnpj', $data->get('cnpj'));
            $empresa->save();

            return json_encode(array('id' => $empresa->getAttribute('id')));
        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function editEmpresa(Request $request, Response $response, $id){

        try{
            $data = $request->json();

            $empresa = Empresa::find($id);
            $empresa->setAttribute('estado_id', $data->get('estado_id'));
            $empresa->setAttribute('nome_fant', $data->get('nome_fant'));
            $empresa->setAttribute('cnpj', $data->get('cnpj'));
            $empresa->save();

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function listEmpresas(Request $request, Response $response){

        try{

            return Empresa::select(
                    'empresas.*',
                    'estados.nome as est_nome'
                )
                ->join('estados', 'estado_id', 'estados.id')
                ->get();

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function loadEmpresa(Request $request, Response $response, $id){

        try{

            $empresa = Empresa::find($id);

            return json_encode($empresa);

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function deleteEmpresa(Response $response, $id){

        try{

            $empresa = Empresa::find($id);
            $empresa->delete();

        }catch (\Exception $error){

            switch ($error->getCode()){
                case '23000':
                    $returnMessage = 'Existem registros vinculados';
                    break;
                default:
                    $returnMessage = $error->getMessage();
                    break;
            }

            $return = [
                'message' => $returnMessage
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }
}