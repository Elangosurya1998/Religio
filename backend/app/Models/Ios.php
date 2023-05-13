<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ios extends Model
{
    protected $fillable = [
                    'Iosdate',    
                    'Iosstatus',
                    'client_id'
    ];
}

