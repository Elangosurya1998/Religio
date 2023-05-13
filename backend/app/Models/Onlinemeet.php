<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Onlinemeet extends Model
{
    protected $table = 'onlinemeeting';
    protected $fillable = [
        'id',
        'onlinemeeting',
        'onlinedate',
        'onlinehours',
        'online',
        'onlinerating',
        'client_id'
    ];
}