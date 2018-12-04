<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model{

    protected $table = 'fornecedores';
    const CREATED_AT = 'data_cad';
    const UPDATED_AT = null;
}