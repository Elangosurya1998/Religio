<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domainrenewal extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = 'domainrenewal';

    protected $fillable = [
        'id',
        'sitename',
        'siteurl',
        'serverdetail',
        'servername',
        'domain_create_date',
        'domain_expire_date'
    ];
}
