<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Datasupport extends Model
{
    protected $table = 'datasupports';
    protected $fillable = [
        'noofcommunity',
        'noofinstitution',
        'noofmembers',
        'dataentry',
        'client_id'
];
 
}
