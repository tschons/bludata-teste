<?php

namespace App\Http\Controllers;

use App\Telefone;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TelefoneController extends Controller {

    public function createTelefone(Request $request, Response $response){

        try{
            $data = $request->json();

            $telefone = new Telefone();
            $telefone->setAttribute('numero', $data->get('numero'));
            $telefone->setAttribute('forn_id', $data->get('forn_id'));
            $telefone->save();
        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function listTelefones(Response $response, $fornecedor){

        try{

            $telefones = Telefone::where('forn_id', '=', $fornecedor)
                ->get();

            return $telefones;

        }catch (\Exception $error){

            $return = [
                'message' => $error->getMessage()
            ];

            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
            $response->setContent(json_encode($return));

            return $response;
        }
    }

    public function deleteTelefone(Response $response, $id){

        try{

            $telefone = Telefone::find($id);
            $telefone->delete();

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