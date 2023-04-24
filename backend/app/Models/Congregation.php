<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Congregation extends Model
{
    use HasFactory;

    protected $table = 'congregation';

    protected $fillable = [
        'id',
        'congregation',
        'address1',
        'state',
        'address2',
        'postcode',
        'city',
        'country' ,
        'mobile',
        'email' 
    ];
}
