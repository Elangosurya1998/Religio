<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ourcustomersay extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $table = 'ourcustomersays';

    protected $fillable = [
        'id',
        'congregation',
        'province',
        'client',
        'title',
        'comments',
        'created_at',
        'updated_at'
    ];
}
