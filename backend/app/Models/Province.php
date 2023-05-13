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
        'congregation',
        'province',
        'address1',
        'state',
        'address2',
        'postcode',
        'city',
        'country',
        'mobile',
        'email',
        'contactname',
        'contactrole',
        'contactemail',
        'contactmobile',
        'contactstatus'
    ];
}
