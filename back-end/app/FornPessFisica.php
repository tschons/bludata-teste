<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FornPessFisica extends Model{

    protected $table = 'forn_pess_fisica';
    protected $primaryKey = 'forn_id';
    public $incrementing = false;
    public $timestamps = false;

}