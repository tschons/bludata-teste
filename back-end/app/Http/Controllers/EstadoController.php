<?php

namespace App\Http\Controllers;

use App\Estado;
use Illuminate\Http\Response;

class EstadoController extends Controller
{

    public function listEstados(Response $response){

        try{
            return Estado::all();

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
