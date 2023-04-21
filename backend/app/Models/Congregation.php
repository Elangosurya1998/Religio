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
        'CongregationName',
        'Address1',
        'state',
        'Address2',
        'Postcode',
        'City',
        'country' ,
        'Mobile',
        'Email' 
    ];
}
