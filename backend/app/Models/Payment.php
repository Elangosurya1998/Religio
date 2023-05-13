<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'id',
        'clienttype',
        'congregation',
        'province',
        'product',
        'place',
        'financialyear',
        'clientcode',
        'pi',
        'balancepaid',
        'renewelmonth',
        'projectvalue',
        'amcvalue',
        'gst',
        'total',
        'paid',
        'balance',
        'status',
        'receipt',
        'invoice'

    ];
}
