<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobileapps extends Model
{
    protected $fillable = [
                    'mobiledate', 
                    'mobilestatus',
                    'client_id'
    ];
}

