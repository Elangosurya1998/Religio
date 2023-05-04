<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientregistration extends Model
{
    use HasFactory;

    protected $table = 'client_registrations';

    protected $fillable = [
        'id',
        'congregation',
        'province',
        'name',
        'place',
        'clienttype',
        'financialyear',
        'clientcode',
        'dateofjoining',
        'dateofcontractsigning',
        'amcdate',
        'projectvalue',
        'amcvalue',
        'projectstatus',
        'fileattachment',
        'address1',
        'state',
        'address2',
        'postcode',
        'city',
        'country',
        'mobile',
        'email',
        'website', 
        'app',      
    'webapplication'  
    ];
}
