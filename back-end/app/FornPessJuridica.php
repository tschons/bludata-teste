<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FornPessJuridica extends Model{

    protected $table = 'forn_pess_juridica';
    protected $primaryKey = 'forn_id';
    public $incrementing = false;
    public $timestamps = false;
}