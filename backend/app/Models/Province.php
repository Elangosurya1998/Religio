<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'provinces';

    protected $fillable = [
        'id',
        'Congregation',
        'Province',
        'Address1',
        'state',
        'Address2',
        'Postcode',
        'City',
        'country'
    ];
}
