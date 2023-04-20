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
        'Congregation',
        'Province',
        'Name',
        'Place',
        'ClientType',
        'FinancialYear',
        'ClientCode',
        'DateofJoining',
        'DateofContractSigning',
        'AMCDate',
        'ProjectValue',
        'AMCvalue',
        'ProjectStatus',
        'FileAttachment',
        'Address1',
        'state',
        'Address2',
        'Postcode',
        'City',
        'country'
        
    ];
}
